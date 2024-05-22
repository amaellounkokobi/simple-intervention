# Python version 2.7
FROM python:2.7

# Setup the working directory
WORKDIR /backend

# Copy the files into the docker container
COPY . /backend

COPY ./requirements.txt /backend/requirements.txt

# Copy the wait-for-it script into the container
COPY wait-for-it.sh /backend/wait-for-it.sh
RUN chmod +x /backend/wait-for-it.sh

# Install app requirements
RUN pip install -r requirements.txt

# Expose the port 5000
EXPOSE 5000

# Run the backend
CMD  ["./wait-for-it.sh", "db:5432", "--", "python", "./run.py"]
