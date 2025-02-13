FROM grafana/grafana:11.5.1
COPY provisioning /etc/grafana/provisioning
COPY dashboard_files /etc/dashboards
