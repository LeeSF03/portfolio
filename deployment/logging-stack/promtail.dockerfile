FROM grafana/promtail:3.4
COPY promtail.yaml /etc/promtail/config.yaml
CMD ["-config.file=/etc/promtail/config.yaml"]
