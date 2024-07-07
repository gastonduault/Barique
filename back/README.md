## TODO of back
- Change schema of database
- Fix the error of the 3306 port
- Store database if services shutdown
- Generate swagger (endpoints)

## CMD:
- `docker system prune -a --volumes`



## Get start
- install *docker*
- install *docker-compose*


- **start services** : `sudo docker-compose up`
  - command in folder `./back/`


>If **Error**⚠️ of port `3306`:
  > ``` Creating mysql ... error```<br/> ``` ERROR: for mysql  Cannot start service mysql: driver failed programming external connectivity on endpoint mysql```
  > - Do the commande :
  >   - ```sudo service mysql stop ```
  >   - or
  >   - To know the processus and him PID who on the 3306 port
  >   - ```sudo lsof -i :5000```  (If not result so the port is free)
  >   - ```sudo kill -9 PID du processus qui occupe le port 3306```
  > - Then restart services :
  >   - ```sudo docker-compose down ```
  >   - ```sudo docker-compose up ```


## endpoints :
>>-  **[POST]** `api/login`
     >>      - *send* **json**: `{username, password}`
>> *receive* **json**: `{[id_cave, nom_cave]}`
>
>>- **[POST]** `api/signin`
    >>     - *send* **json**: `{username, password}`
>
>>- **[POST]** `api/login/cave`
    >>     - *send* **json**: `{id_cave}`
>
>>- **[GET]** `api/cave/id`
    >>     - Listes des bouteilles
>>     - Nom de la cave (Propriétaire)
>
>>- **[GET]** `api/cave/bouteille/id`
    >>     - Plus d'information sur la bouteille
>>     - *send* **json**: `{id_bouteille}`
>
>>- **[POST]** `api/cave/bouteille`
    >>     - ajout / modification d'une bouteille
>>     - *send* **json**: `{nom, region, cuvee, type, annee, url_image}`
>
>>- **[DELETE]** `api/cave/bouteille/id`
    >>     - supression d'une bouteille
>>     - *send* **json**: `{id_bouteille}`
>
>>- **[GET]** `api/cave/historique`
    >>     - *send* **json**: `{id_cave}`
>
>#### Test des endpoints :
> - Add utilisateur<br/>
``` curl http://localhost:5001/cave/1```
> - Liste des bouteilles d'une cave (à partir de son id)<br/>
``` curl http://localhost:5001/cave/bouteilles/1```
> - Modifier le nom d'une cave<br/> 
``` curl -X PUT -H "Content-Type: application/json" -d '{"nom": "NouveauNomDeCave"}' http://localhost:5001/caves/1```
> - Modifier une bouteille <br/>
``` curl -X PUT -H "Content-Type: application/json" -d '{"nom": "NouveauNom", "cuvee": "NouvelleCuvee", "region": "NouvelleRegion", "categorie": "NouvelleCategorie", "date_recolte": "NouvelleDateRecolte", "caveId": 2}' http://localhost:5001/bouteilles/1```
> - Supprimer une bouteille<br/>
``` curl -X DELETE http://localhost:5001/bouteilles/1 ```
> - Ajouter une bouteille<br />
``` curl -X POST -H "Content-Type: application/json" -d '{"nom": "Nom de la bouteille", "cuvee": "Cuvee de la bouteille", "region": "Region de la bouteille", "categorie": "Categorie de la bouteille", "date_recolte": 2022, "caveId": 1 } ```
