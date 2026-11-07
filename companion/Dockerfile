FROM python:3.12-slim
RUN pip install --no-cache-dir httpx==0.28.1 pyyaml==6.0.2 beautifulsoup4==4.12.3 \
 && useradd --create-home --uid 1000 companion
WORKDIR /app
COPY companion/watcher.py companion/library.py /app/
COPY data /app/data
USER companion
ENV PYTHONUNBUFFERED=1
EXPOSE 8088
CMD ["python", "/app/watcher.py"]
