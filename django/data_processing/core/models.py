from django.db import models

class Files(models.Model):
    # This model represents a file uploaded by the user.
    # It contains a file field to store the uploaded file and a timestamp for when it was uploaded.
    file = models.FileField(upload_to='uploads/')
    # The uploaded_at field is automatically set to the current date and time when the file is uploaded.
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file