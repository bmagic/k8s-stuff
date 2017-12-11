#Vodalys k8s
## Créer les autorisations
Créez une application et récupérez le token d'accès sur le site d'OVH https://eu.api.ovh.com/createToken/ 

L'application doit pouvoir accéder aux path suivant : 
- GET /*
- POST /* 
- PUT /* 
- DELETE /*
 
Les champs générés doivent être passés à l'application en variables d'environnement:
- Application Key
- Application Secret
- Consumer Key

## Installation 
Lancez le script d'installation npm pour télécharger les dépendances
```
npm install
```

## Exécution 
Parametrez les variables d'environnement suivantes : 
- OVH_API_END_POINT : Endpoint d'API OVH (Defaut : 'ovh-eu')
- OVH_API_APP_KEY : Clé d'application 
- OVH_API_APP_SECRET : Secret d'application
- OVH_API_CONSUMER_KEY : Clé d'utilisation 
- OVH_API_CLOUD_PROJECT : Identifiant du projet Public Cloud


```
npm start 
```