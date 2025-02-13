FROM prom/prometheus:v3.1.0
COPY prometheus.yaml /etc/prometheus/prometheus.yml
CMD ["--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus"]
