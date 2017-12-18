#!/bin/bash
#Init network
cp scripts/private.cfg /etc/network/interfaces.d/
systemctl restart networking.service

#Install Docker
apt-get update
apt-get install -y docker.io

#Install KubeAdm
apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo 'deb http://apt.kubernetes.io/ kubernetes-xenial main' > /etc/apt/sources.list.d/kubernetes.list

apt-get update
apt-get install -y kubelet kubeadm kubectl

#Add Node to the cluster