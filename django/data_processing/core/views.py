from django.shortcuts import render

from .models import Files
from .serializers import FilesSerializer

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

import pandas as pd
import re
import os

class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer

    def create(self, request, *args, **kwargs):
        # Save the file instance
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Process the uploaded file
        file_path = instance.file.path
        self.process_file(file_path)

        # Generate the download URL
        download_url = f"{self.request.build_absolute_uri(instance.file.url)}"
        return Response({"id": instance.id, "download_url": download_url}, status=status.HTTP_201_CREATED)

    def process_file(self, file_path):
        # Define the columns to be used and the header row
        require_cols = [10, 11]
        header_row = 6

        # Load the Excel file
        df = pd.read_excel(file_path, usecols=require_cols, header=header_row)
        df = df.dropna()

        # Extract doctor names
        doctor_names = df.iloc[:, -1].drop_duplicates().tolist()

        # Process medicine names and quantities
        medicine_dict = {}

        def parse_medicine(medicine_str):
            match = re.match(r'(.+?) SL: (\d+)', medicine_str)
            return match.groups() if match else (None, None)

        for _, row in df.iterrows():
            doctor_name = row.iloc[-1]
            medicines = row.iloc[0].split(';')

            for medicine in medicines:
                med_name, quantity = parse_medicine(medicine.strip())
                if med_name and quantity:
                    if med_name not in medicine_dict:
                        medicine_dict[med_name] = {doctor: 0 for doctor in doctor_names}
                    medicine_dict[med_name][doctor_name] += int(quantity)

        # Create a DataFrame for results
        result_df = pd.DataFrame.from_dict(medicine_dict, orient='index', columns=doctor_names)
        result_df['>>> Total <<<'] = result_df.sum(axis=1)

        # Save the processed data to a new sheet in the same file
        with pd.ExcelWriter(file_path, mode='a', engine='openpyxl', if_sheet_exists='replace') as writer:
            result_df.to_excel(writer, sheet_name='Result', startrow=0)