# Python version 2.7
FROM python:2.7

# Setup the working directory
WORKDIR /backend

# Copy the files into the docker container
COPY . /backend

COPY ./requirements.txt /backend/requirements.txt

# Install app requirements
RUN pip install -r requirements.txt

# Expose the port 5000
EXPOSE 5000

# Run the backend
CMD python ./run.py