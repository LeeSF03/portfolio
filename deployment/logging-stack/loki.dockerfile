FROM grafana/loki:3.4
COPY loki.yaml /etc/loki/config.yaml
CMD ["-config.file=/etc/loki/config.yaml"]
