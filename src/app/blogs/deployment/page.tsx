import CodeBlock from '@/components/CodeBlock'
import Image from 'next/image'
import { publicRoot } from '@/constants/global'

export default function DeploymentPage() {
  return (
    <div className="flex flex-col gap-y-5 pt-3">
      <span className="text-5xl font-semibold">
        Deploying a NextJS website with Docker, Nginx, Ansible and GitHub
        Actions
      </span>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Getting Started'}
        </div>
        <div className="font-jetbrains text-2xl font-semibold">
          {'Building Something to Host'}
        </div>
        <p className="font-jetbrains">
          {
            "The first step to hosting is actually having something to host—so let's get to it! For me, a simple blogging website built with Next.js and styled with Tailwind CSS is a great starting point. Now, I understand that using a Next.js server for a basic website might seem like overkill. However, I plan to expand this project by adding blogs, games, and other features. Just hosting Next.js alone would be too simplistic—especially since this project is also an opportunity to explore DevOps. That’s where Nginx comes in as a reverse proxy and CDN."
          }
        </p>
        <Image
          src={`${publicRoot}/img/blogs/deployment/deployment.png`}
          width={1920}
          height={1080}
          alt={'deployment'}
          className="rounded-2xl border-2 border-gray-500 shadow-[5px_5px_lightblue]"
        />
        <div className="font-jetbrains text-2xl font-semibold">
          {'Why Use Nginx with Next.js?'}
        </div>
        <p className="font-jetbrains">
          {
            'Instead of allowing Next.js to listen on port 80 directly, I’m using Nginx as a reverse proxy for three key reasons:'
          }
        </p>
        <ol className="ml-6 list-disc font-jetbrains">
          <li>
            {
              'Performance & Scalability – Nginx efficiently handles static assets, reducing the load on the Next.js server and improving overall performance.'
            }
          </li>
          <li>
            {
              'Security – It acts as a buffer between the client and the application, enabling features like rate limiting, request filtering, and SSL termination.'
            }
          </li>
          <li>
            {
              'Service Management – Nginx simplifies managing multiple services on the same server, whether running additional applications alongside Next.js or setting up load balancing in the future.'
            }
          </li>
        </ol>
        <p className="font-jetbrains">
          {`
Additionally, I’ll be running a third container with Certbot to handle SSL certificates, checking their expiration daily and renewing them automatically.
            `}
        </p>
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Writing Dockerfiles'}
        </div>
        <div className="space-y-1">
          <div className="font-jetbrains text-2xl font-semibold">
            {'Why Containerize the Application?'}
          </div>
          <p className="font-jetbrains">
            {
              'One major benefit of containers is isolation. Since I’ll likely make plenty of mistakes while deploying, it’s tempting to tweak configurations directly on the server. However, this can lead to configuration drift or accidental modifications. Running applications in containers keeps them isolated from each other and from the host system, helping to prevent these issues—or at least minimize them.'
            }
          </p>
        </div>
        <CodeBlock
          label={'dockerfile - Dockerfile of NextJS application'}
          code={`
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN yarn build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
EXPOSE 3000
CMD ["yarn", "start"]

`}
        />
        <CodeBlock
          label={'nginx.conf - Nginx configuration'}
          code={`
limit_req_zone $binary_remote_addr zone=req_limit:10m rate=10r/s;

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  # SSL configuration
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;

  ssl_certificate /var/www/cert/live/leesf.xyz/fullchain.pem;
  ssl_certificate_key /var/www/cert/live/leesf.xyz/privkey.pem;

  root /var/www/portfolio;

  server_name leesf.xyz;

  location / {
    limit_req zone=req_limit burst=20 nodelay;

    proxy_pass http://web:3000;
    proxy_pass_request_headers on;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /img {
    limit_req zone=req_limit burst=20 nodelay;

    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }

  location /_next/static {
    limit_req zone=req_limit burst=20 nodelay;

    try_files $uri $uri/ =404;
  }

  location /.well-known/acme-challenge {
    root /var/www/acme;
  }
}

`}
        />
        <CodeBlock
          label={'nginx.dockerfile - Dockerfile of Nginx container'}
          code={`
limit_req_zone $binary_remote_addr zone=req_limit:10m rate=10r/s;

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  # SSL configuration
  listen 443 ssl default_server;
  listen [::]:443 ssl default_server;

  ssl_certificate /var/www/cert/live/leesf.xyz/fullchain.pem;
  ssl_certificate_key /var/www/cert/live/leesf.xyz/privkey.pem;

  root /var/www/portfolio;

  server_name leesf.xyz;

  location / {
    limit_req zone=req_limit burst=20 nodelay;

    proxy_pass http://web:3000;
    proxy_pass_request_headers on;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /img {
    limit_req zone=req_limit burst=20 nodelay;

    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    try_files $uri $uri/ =404;
  }

  location /_next/static {
    limit_req zone=req_limit burst=20 nodelay;

    try_files $uri $uri/ =404;
  }

  location /.well-known/acme-challenge {
    root /var/www/acme;
  }
}

`}
        />
        <CodeBlock
          label={'certbot.dockerfile - Dockerfile of certbot container'}
          code={`
FROM alpine:3.21.2
RUN apk update
RUN apk add certbot
COPY ./deployment/crontab /var/spool/cron/crontabs/root
RUN sed -i 's/\r$//' /var/spool/cron/crontabs/root
CMD ["crond", "-f"]

`}
        />
        <CodeBlock
          label={
            'docker-compose.deploy.yaml - Docker Compose file for deploying the containers'
          }
          code={`
services:
  web:
    image: leesf003/portfolio-web
    container_name: web
    volumes:
      - /app/node_modules
      - static:/app/.next/static
      - images:/app/public/img
    ports:
      - "3000:3000"
    env_file: ./.env

  nginx:
    image: leesf003/portfolio-nginx
    container_name: nginx
    volumes:
      - static:/var/www/portfolio/_next/static
      - images:/var/www/portfolio/img
      - acme:/var/www/acme
      - /etc/letsencrypt:/var/www/cert
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NGINX_HOST=portfolio-nginx.com
      - NGINX_PORT=80

  certbot:
    image: leesf003/cert-renewal-cron
    container_name: certbot-renew-cron
    depends_on:
      - nginx
    volumes:
      - acme:/letsencrypt
      - /etc/letsencrypt:/etc/letsencrypt

volumes:
  static:

  images:

  acme:

`}
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Setting Up SSL with Certbot'}
        </div>
        <p className="font-jetbrains">
          {
            'Before securing the site with HTTPS, we need to retrieve an SSL certificate. This involves setting up an ACME challenge using a simple Nginx web server and Certbot. Once retrieved, we can use the certificate to enable HTTPS.'
          }
        </p>
        <CodeBlock
          label={'nginx.conf - nginx configuration for setting SSL'}
          code={`
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name _;

  location /.well-known/acme-challenge {
    root /var/www/acme;
  }
}

`}
        />
        <CodeBlock
          label={'nginx.dockerfile - Dockerfile of for setting up SSL'}
          code={`
FROM nginx:1.27.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]

`}
        />
        <CodeBlock
          label={
            'docker-compose.ssl.yaml - Docker Compose file for starting docker container to setup SSL'
          }
          code={`
services:
  nginx:
    image: leesf003/cert-nginx
    container_name: nginx
    volumes:
      - acme:/var/www/acme
      - /etc/letsencrypt:/var/www/cert
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NGINX_HOST=portfolio-nginx.com
      - NGINX_PORT=80

  certbot:
    image: certbot/certbot:v3.1.0
    container_name: certbot
    depends_on:
      - nginx
    volumes:
      - acme:/letsencrypt
      - /etc/letsencrypt:/etc/letsencrypt
    command: certonly --reinstall --webroot --webroot-path=/letsencrypt --email shuenfeilee@gmail.com --agree-tos --no-eff-email -d leesf.xyz

volumes:
  acme:

`}
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Deploying to an Azure VM'}
        </div>
        <div className="space-y-1">
          <div className="font-jetbrains text-2xl font-semibold">
            {'Starting a Virtual Machine'}
          </div>
          <p className="font-jetbrains">
            {
              'Now, it’s time to choose a cloud platform or VPS provider. I opted for Azure, specifically its free-tier VM. This would have been a great opportunity to learn Terraform to automate VM deployment, but I couldn’t find a way to use Terraform with Azure’s free service. So, I had to manually start the VM via the Azure portal.'
            }
          </p>
          <p className="font-jetbrains">
            <span className="font-bold">Pro Tip: </span>
            {
              'Make sure the required ports are open—SSH (22), HTTP (80), and HTTPS (443). It took me a while to figure out why my HTTP connections were being denied!'
            }
          </p>
        </div>
        <Image
          className="rounded-2xl border-2 border-gray-800"
          src={`${publicRoot}/img/blogs/deployment/azure1.png`}
          width={1080}
          height={1920}
          alt={'azure step 1'}
        />
        <Image
          className="rounded-2xl border-2 border-gray-800"
          src={`${publicRoot}/img/blogs/deployment/azure2.png`}
          width={1080}
          height={1920}
          alt={'azure step 2'}
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Automating Server Setup with Ansible'}
        </div>
        <div className="space-y-1">
          <div className="font-jetbrains text-2xl font-semibold">
            {'Why Use Ansible?'}
          </div>
          <p className="font-jetbrains">
            {
              'Instead of manually configuring the server via SSH, I prefer automation to ensure a reproducible setup. Ansible allows me to define my server configuration in YAML files, making it easy to redeploy whenever needed.'
            }
          </p>
        </div>
        <div className="space-y-1">
          <ol className="ml-6 list-disc font-jetbrains">
            <li>
              {
                'Automation – No need to configure the server manually every time I redeploy.'
              }
            </li>
            <li>
              {
                'Idempotency – Running the same playbook multiple times won’t break anything; it will only apply necessary changes.'
              }
            </li>
          </ol>
        </div>
        <p className="font-jetbrains">
          {
            'Ansible also provides community-maintained modules that simplify Docker container deployment.'
          }
        </p>
        <div className="font-jetbrains text-2xl font-semibold">
          {'Setting Up Azure VM:'}
        </div>
        <CodeBlock
          label={'inventory.yaml - Inventory file of vm host'}
          code={`
azure:
  hosts:
    <vm_ip>:
      ansible_user: <vm_user>
      ansible_ssh_private_key_file: <ssh_private_key>

`}
        />
        <CodeBlock
          label={'ssh.yaml - Change sshd configuration'}
          code={`
- name: Update sshd config
  hosts: azure
  become: true
  tasks:
    - name: Change ssh PasswordAuthentication to no
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "^#PasswordAuthentication*"
        line: "PasswordAuthentication no"
        state: present

    - name: Change ssh PermitRootLogin to no
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "^#PermitRootLogin*"
        line: "PermitRootLogin no"
        state: present

    - name: Reload sshd
      systemd_service:
        name: sshd
        state: reloaded

`}
        />
        <CodeBlock
          label={'docker-install.yaml - install docker in VM'}
          code={`
- name: Install and enable docker daemon
  hosts: azure
  become: true
  tasks:
    - name: Install dependencies to install docker
      apt:
        name:
          - apt-transport-https
          - ca-certificates
          - curl
          - software-properties-common
          - python3-pip # these dependencies are so that ansible can interact with docker
          - virtualenv
          - python3-setuptools
        state: latest
        update_cache: true

    - name: Add docker GPG apt Key
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        state: present

    - name: Add Docker Repository
      apt_repository:
        repo: deb https://download.docker.com/linux/ubuntu focal stable
        state: present

    - name: Update apt and install docker-ce
      apt:
        name: docker-ce
        state: latest
        update_cache: true

    - name: Install docker module for python
      pip:
        name: docker

`}
        />
        <CodeBlock
          label={'setup.yaml - install docker in VM'}
          code={`
- name: Setup user, compose file and inbound traffic
  hosts: azure
  become: true

  vars_files:
    - vault.yaml

  tasks:
    - name: Add user to docker group
      user:
        name: "{{ ansible_user }}"
        groups: docker
        append: true

    - name: Reset ssh connection to take allow affect of group append
      meta: reset_connection

    - name: Copy docker compose file
      copy:
        src: /mnt/d/Projects/portfolio/docker-compose.deploy.yaml
        dest: "/home/{{ ansible_user }}/docker-compose.yaml"
        owner: "{{ ansible_user }}"
        group: "{{ ansible_user }}"
        mode: "0644"

    - name: Copy .env file
      copy:
        src: /mnt/d/Projects/portfolio/.env
        dest: "/home/{{ ansible_user }}/.env"
        owner: "{{ ansible_user }}"
        group: "{{ ansible_user }}"
        mode: "0644"

    - name: Install firewall
      apt:
        name: firewalld

    - name: Permit inbound traffic to port 443/tcp for https
      firewalld:
        port: 443/tcp
        permanent: true
        immediate: true
        state: enabled

    - name: Permit inbound traffic to port 80/tcp for http
      firewalld:
        port: 80/tcp
        permanent: true
        immediate: true
        state: enabled

    - name: Log into DockerHub
      community.docker.docker_login:
        username: leesf003
        password: "{{ docker_pass }}"

`}
        />
        <CodeBlock
          label={'ssl.yaml - set up SSL in VM'}
          code={`
- name: Pull and run container to get certificate
  tasks:
    - name: Copy docker compose file
      copy:
        src: ./docker-compose.ssl.yaml
        dest: "/home/{{ ansible_user }}/docker-compose.ssl.yaml"
        owner: "{{ ansible_user }}"
        group: "{{ ansible_user }}"
        mode: "0644"


    - name: Run cert containers
      community.docker.docker_compose_v2:
        state: present
        project_src: "/home/{{ ansible_user }}"
        files:
          - docker-compose.ssl.yaml

`}
        />
        <CodeBlock
          label={'ssl-down.yaml - Take down containers used for setting up SSL'}
          code={`
- name: Remove containers and image for cert setup
  hosts: azure
  tasks:
    - name: Run compose down
      community.docker.docker_compose_v2:
        state: absent
        remove_volumes: true
        project_src: "/home/{{ ansible_user }}"
        files:
          - docker-compose.yaml

    - name: Remove cert-nginx image
      community.docker.docker_image_remove:
        name: leesf003/cert-nginx
        force: true

    - name: Remove certbot image
      community.docker.docker_image_remove:
        name: certbot/certbot
        force: true

`}
        />
        <div className="font-jetbrains text-3xl font-semibold">
          {'Deploying Containers to Azure VM:'}
        </div>
        <CodeBlock
          label={'deploy.yaml - Deploying containers to VM'}
          code={`
- name: Prune, pull image and run container
  hosts: azure
  tasks:
    - name: Run docker compose down
      community.docker.docker_compose_v2:
        state: absent
        remove_volumes: true
        project_src: '/home/{{ ansible_user }}'
        files:
          - docker-compose.yaml

    - name: Prune docker nginx images
      community.docker.docker_image_remove:
        prune: true
        name: leesf003/portfolio-nginx

    - name: Prune web images
      community.docker.docker_image_remove:
        prune: true
        name: leesf003/portfolio-web

    - name: Pull portfolio web image
      community.docker.docker_image_pull:
        name: leesf003/portfolio-web
        platform: amd64

    - name: Pull portfolio nginx image
      community.docker.docker_image_pull:
        name: leesf003/portfolio-nginx
        platform: amd64

    - name: Pull cert-renewal-cron image
      community.docker.docker_image_pull:
        name: leesf003/cert-renewal-cron
        platform: amd64

    - name: Run docker compose up
      community.docker.docker_compose_v2:
        state: present
        project_src: '/home/{{ ansible_user }}'
        files:
          - docker-compose.yaml

`}
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Automating Deployment with GitHub Actions'}
        </div>
        <p className="font-jetbrains">
          {
            'Manually running Ansible playbooks every time I want to deploy changes would get repetitive. That’s where GitHub Actions comes in!'
          }
        </p>
        <p className="font-jetbrains">
          {'With a simple CI/CD pipeline, I can automate deployment:'}
        </p>
        <div className="space-y-1">
          <ol className="ml-6 list-disc font-jetbrains">
            <li>
              {
                'GitHub Actions automatically runs tests and deploys the updates.'
              }
            </li>
            <li>{'I sit back and let it handle the rest.'}</li>
          </ol>
        </div>
        <CodeBlock
          label={
            '.github/workflows/build_image.yaml - Auto build and push image'
          }
          code={`
name: Build and push docker image
run-name: Building docker image of web, nginx and certbot
on:
  push:
    branches:
      - main

jobs:
  build_push_docker_image:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: \${{ vars.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_ACCESS_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push web image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          file: dockerfile
          tags: leesf003/portfolio-web:latest

      - name: Build and push nginx image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          file: nginx.dockerfile
          tags: leesf003/portfolio-nginx:latest

      - name: Build and push certbot image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          file: certbot.dockerfile
          tags: leesf003/cert-renewal-cron:latest

`}
        />
        <CodeBlock
          label={'.github/workflows/deploy.yaml - Auto deploy containers to VM'}
          code={`
name: Deploy container to VM
run-name: Deploying container to Azure VM
on:
  workflow_run:
    workflows:
      - Build and push docker image
    types:
      - completed

jobs:
  deploy_containers:
    runs-on: ubuntu-latest
    if: \${{ github.event.workflow_run.conclusion == 'success' }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup SSH Key
        run: |
          mkdir ~/.ssh
          touch ~/.ssh/leesf_az_key_pair.pem
          echo "\${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/leesf_az_key_pair.pem
          chmod 600 ~/.ssh/leesf_az_key_pair.pem

      - name: Install Ansible
        shell: bash
        run: |
          sudo apt update
          sudo apt install -y ansible

      - name: Run Ansible Playbook
        env:
          ANSIBLE_USER: leesf
          ANSIBLE_HOST_KEY_CHECKING: False
        run: |
          ansible-playbook -i deployment/inventory.yaml deployment/playbooks/deploy.yaml

`}
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Alternative: AWX'}
        </div>
        <p className="font-jetbrains">
          {
            'AWX (the open-source version of Ansible Tower) offers similar functionality, listening to Git events and running Ansible playbooks. However, running AWX would require an extra VM or a resource-heavy container—an unnecessary expense when GitHub Actions already does the job.'
          }
        </p>
        <Image
          src={`${publicRoot}/img/blogs/deployment/awx-or-github-actions.png`}
          width={400}
          height={300}
          className="rounded-2xl border-2 border-gray-800"
          alt="AWX or GitHub Actions"
        />
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Future Plans: Monitoring with Prometheus, Loki, and Grafana'}
        </div>
        <p className="font-jetbrains">
          {
            'Looking ahead, I plan to integrate monitoring tools like Prometheus, Loki, and Grafana to track server performance and logs. This will provide valuable insights into the system’s health and help in troubleshooting issues.'
          }
        </p>
      </div>
      <div className="flex flex-col gap-y-4 overflow-hidden rounded-2xl border-4 border-gray-800 bg-orange-200 p-5 text-justify shadow-[7px_7px]">
        <div className="font-jetbrains text-3xl font-semibold">
          {'Final Thoughts'}
        </div>
        <p className="font-jetbrains">
          {
            'This project started as a simple website but quickly evolved into an end-to-end DevOps learning experience. From setting up a Next.js app to deploying it with Nginx, Docker, Ansible, and GitHub Actions, every step reinforced best practices in automation, security, and scalability.'
          }
        </p>
        <p className="font-jetbrains">
          {
            'What’s next? Probably more automation, monitoring, and fine-tuning. If you have any suggestions, feel free to share!'
          }
        </p>
      </div>
    </div>
  )
}
