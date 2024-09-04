FROM python:3.8

RUN mkdir /usr/src/app/
COPY . /usr/src/app/
WORKDIR /usr/src/app/

RUN pip install --upgrade pip && \
    pip install -r requirement.txt

COPY . .

EXPOSE 5001

CMD ["python", "run.py"]
