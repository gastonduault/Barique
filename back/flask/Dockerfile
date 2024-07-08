FROM python:3.8
RUN mkdir /usr/src/app/
COPY . /usr/src/app/
#SSL certifications
COPY key.pem /app/key.pem
COPY cert.pem /app/cert.pem
WORKDIR /usr/src/app/
EXPOSE 5001
RUN pip install -r requirement.txt
CMD ["python", "app.py"]
