import datetime
from os import stat
from wsgiref.util import request_uri
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from calendar import monthrange
from dateutil.relativedelta import relativedelta


#Service d'affecation

@api_view(['GET'])
def getAllServiceAffectation(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = ServiceAffectation.objects.all()
        print(queryset)

        source_serial = ServiceAffectationSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
                
    
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED)  
    
@api_view(['GET'])
def getServiceAffectationForSelection(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = ServiceAffectation.objects.all()
        print(queryset)

        source_serial = ServiceAffectationListSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['POST'])
def createServiceAffectation(request):
    if request.method == 'POST' and request.user.is_authenticated:
        service = request.data.pop('service')
        type = request.data.pop('type')

        source = ServiceAffectation.objects.create(service=service, type=type)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"service_affectation created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateServiceAffectation(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        service = request.data.pop('service')
        type = request.data.pop('type')
        service_to_update = ServiceAffectation.objects.get(id=id)
        if not service_to_update.service == service:
            service_to_update.service = service
        if not service_to_update.type == type:
            service_to_update.type = type
        
        service_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"service_affectation updated"})
    
@api_view(['DELETE'])
def deleteServiceAffectation(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        ServiceAffectation.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"service_affectation deleted"})





#Fournisseur

@api_view(['GET'])
def getAllFournisseurs(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.all()
        print(queryset)

        source_serial = FournisseurSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['GET'])
def getFournisseurForSelection(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Fournisseur.objects.all()
        print(queryset)

        source_serial = FournisseurListSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    
@api_view(['POST'])
def createFournisseur(request):
    if request.method == 'POST' and request.user.is_authenticated:
        company_name = request.data.pop('company_name')
        phone_number = request.data.pop('phone_number')
        adress = request.data.pop('adress')
        email = request.data.pop('email')

        source = Fournisseur.objects.create(company_name=company_name, phone_number=phone_number, adress=adress, email=email)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"fournisseur created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateFournisseur(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        company_name = request.data.pop('company_name')
        phone_number = request.data.pop('phone_number')
        adress = request.data.pop('adress')
        email = request.data.pop('email')
        fournisseur_to_update = Fournisseur.objects.get(id=id)
        if not fournisseur_to_update.company_name == company_name:
            fournisseur_to_update.company_name = company_name
        if not fournisseur_to_update.phone_number == phone_number:
            fournisseur_to_update.phone_number = phone_number
        if not fournisseur_to_update.adress == adress:
            fournisseur_to_update.adress = adress
        if not fournisseur_to_update.email == email:
            fournisseur_to_update.email = email
        
        fournisseur_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"fournisseur updated"})
    
@api_view(['DELETE'])
def deleteFournisseur(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Fournisseur.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"fournisseur deleted"})





#Famille

@api_view(['GET'])
def getFamilles(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Famille.objects.all()
        print(queryset)

        source_serial = FamilleSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['GET'])   
def getFamillesForSelection(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Famille.objects.all()
        print(queryset)

        source_serial = FamilleListSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['POST'])
def createFamille(request):
    if request.method == 'POST' and request.user.is_authenticated:
        famille_name = request.data.pop('famille_name')

        source = Famille.objects.create(famille_name=famille_name)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"famille created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateFamille(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        famille_name = request.data.pop('famille_name')
        famille_to_update = Famille.objects.get(id=id)
        if not famille_to_update.famille_name == famille_name:
            famille_to_update.famille_name = famille_name
        
        famille_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"famille updated"})
    
@api_view(['DELETE'])
def deleteFamille(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Famille.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"famille deleted"})





#material_type

@api_view(['GET'])
def getMaterielType(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = MaterielType.objects.all()
        print(queryset)

        source_serial = MaterielTypeSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['GET'])  
def getMaterielTypeForSelection(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = MaterielType.objects.all()
        print(queryset)

        source_serial = MaterielTypeListSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    
@api_view(['POST'])
def createMaterialType(request):
    if request.method == 'POST' and request.user.is_authenticated:
        designation = request.data.pop('designation')
        famille_id = request.data.pop('famile_id')
        famille = Famille.objects.get(id= famille_id)

        source = MaterielType.objects.create(designation=designation, famille=famille)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"material_type created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateMaterialType(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        designation = request.data.pop('designation')
        famille_id = request.data.pop('famile_id')
        famille = Famille.objects.get(id= famille_id)

        material_type_to_update = MaterielType.objects.get(id=id)
        if not material_type_to_update.designation == designation:
            material_type_to_update.designation = designation
        if not material_type_to_update.famille == famille:
            material_type_to_update.famille = famille
        
        material_type_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"material_type updated"})
    
@api_view(['DELETE'])
def deleteMaterialType(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        MaterielType.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"material_type deleted"})


#materials

@api_view(['GET'])
def getMateriels(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Materiel.objects.all()
        print(queryset)

        source_serial = MaterielSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['POST'])
def createMaterial(request):
    if request.method == 'POST' and request.user.is_authenticated:
        material_type_id = request.data.pop('material_type_id')
        marque = request.data.pop('marque')
        date_acq = request.data.pop('date_acq')
        fournisseur_id = request.data.pop('fournisseur')
        service_affectation_id = request.data.pop('service_affectation')
        state = "good"

        date_acquisition = date_acq.split("/")

        d_arr = date_acquisition[0]
        m_arr = date_acquisition[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)

        date_acquisition[0] = d_arr
        date_acquisition[1] = m_arr

        date_acquisition = datetime.date(int(date_acquisition[2]), int(date_acquisition[1]), int(date_acquisition[0]))

        material_type = MaterielType.objects.get(id= material_type_id)
        fournisseur = Fournisseur.objects.get(id= fournisseur_id)
        service_affectation = ServiceAffectation.objects.get(id= service_affectation_id)

        source = Materiel.objects.create(materiel_type=material_type, marque=marque, date_acquisition=date_acquisition, fournisseur=fournisseur, service_affectation=service_affectation, state=state)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"material created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateMaterial(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        material_type_id = request.data.pop('material_type_id')
        marque = request.data.pop('marque')
        date_acq = request.data.pop('date_acq')
        fournisseur_id = request.data.pop('fournisseur')
        service_affectation_id = request.data.pop('service_affectation')

        date_acquisition = date_acq.split("/")

        d_arr = date_acquisition[0]
        m_arr = date_acquisition[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)

        date_acquisition[0] = d_arr
        date_acquisition[1] = m_arr

        date_acquisition = datetime.date(int(date_acquisition[2]), int(date_acquisition[1]), int(date_acquisition[0]))

        material_type = MaterielType.objects.get(id= material_type_id)
        fournisseur = Fournisseur.objects.get(id= fournisseur_id)
        service_affectation = ServiceAffectation.objects.get(id= service_affectation_id)

        material_to_update = Materiel.objects.get(id=id)
        if not material_to_update.materiel_type == material_type:
            material_to_update.materiel_type = material_type
        if not material_to_update.fournisseur == fournisseur:
            material_to_update.fournisseur = fournisseur
        if not material_to_update.service_affectation == service_affectation:
            material_to_update.service_affectation = service_affectation
        if not material_to_update.marque == marque:
            material_to_update.marque = marque
        if not material_to_update.date_acquisition == date_acquisition:
            material_to_update.date_acquisition = date_acquisition
        
        material_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"material updated"})
    
@api_view(['DELETE'])
def deleteMaterial(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Materiel.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"material deleted"})



#affectations

@api_view(['GET'])  
def getAffectations(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Affectation.objects.all()
        print(queryset)

        source_serial = AffectationSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 

@api_view(['POST'])
def createMaterial(request):
    if request.method == 'POST' and request.user.is_authenticated:
        material_type_id = request.data.pop('material_type_id')
        marque = request.data.pop('marque')
        date_acq = request.data.pop('date_acq')
        fournisseur_id = request.data.pop('fournisseur')
        service_affectation_id = request.data.pop('service_affectation')
        state = "good"

        date_acquisition = date_acq.split("/")

        d_arr = date_acquisition[0]
        m_arr = date_acquisition[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)

        date_acquisition[0] = d_arr
        date_acquisition[1] = m_arr

        date_acquisition = datetime.date(int(date_acquisition[2]), int(date_acquisition[1]), int(date_acquisition[0]))

        material_type = MaterielType.objects.get(id= material_type_id)
        fournisseur = Fournisseur.objects.get(id= fournisseur_id)
        service_affectation = ServiceAffectation.objects.get(id= service_affectation_id)

        source = Materiel.objects.create(materiel_type=material_type, marque=marque, date_acquisition=date_acquisition, fournisseur=fournisseur, service_affectation=service_affectation, state=state)

        if source.id is not None:
            return Response(status=status.HTTP_201_CREATED, data = {"status":"material created"})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateMaterial(request, id):
    if request.method == 'POST' and request.user.is_authenticated:
        material_type_id = request.data.pop('material_type_id')
        marque = request.data.pop('marque')
        date_acq = request.data.pop('date_acq')
        fournisseur_id = request.data.pop('fournisseur')
        service_affectation_id = request.data.pop('service_affectation')

        date_acquisition = date_acq.split("/")

        d_arr = date_acquisition[0]
        m_arr = date_acquisition[1]

        if d_arr[0] == '0':
            d_arr.replace('0','',1)
        if m_arr[0] == '0':
            m_arr.replace('0','',1)

        date_acquisition[0] = d_arr
        date_acquisition[1] = m_arr

        date_acquisition = datetime.date(int(date_acquisition[2]), int(date_acquisition[1]), int(date_acquisition[0]))

        material_type = MaterielType.objects.get(id= material_type_id)
        fournisseur = Fournisseur.objects.get(id= fournisseur_id)
        service_affectation = ServiceAffectation.objects.get(id= service_affectation_id)

        material_to_update = Materiel.objects.get(id=id)
        if not material_to_update.materiel_type == material_type:
            material_to_update.materiel_type = material_type
        if not material_to_update.fournisseur == fournisseur:
            material_to_update.fournisseur = fournisseur
        if not material_to_update.service_affectation == service_affectation:
            material_to_update.service_affectation = service_affectation
        if not material_to_update.marque == marque:
            material_to_update.marque = marque
        if not material_to_update.date_acquisition == date_acquisition:
            material_to_update.date_acquisition = date_acquisition
        
        material_to_update.save()
        
        return Response(status=status.HTTP_200_OK, data = {"status":"material updated"})
    
@api_view(['DELETE'])
def deleteMaterial(request, id):
    if request.method == 'DELETE' and request.user.is_authenticated:
        Materiel.objects.filter(id=id).delete()
        return Response(status=status.HTTP_200_OK, data = {"status":"material deleted"})










@api_view(['GET'])
def getEnPanne(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = EnPanne.objects.all()
        print(queryset)

        source_serial = EnPanneSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    

@api_view(['GET'])
def getReparation(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Reparation.objects.all()
        print(queryset)

        source_serial = ReparationSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    

@api_view(['GET'])
def getReforme(request):
    if request.method == 'GET' and request.user.is_authenticated:
        queryset = Reforme.objects.all()
        print(queryset)

        source_serial = ReformeSerializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK,data=source_serial.data)
        
    else :
        return Response(status=status.HTTP_401_UNAUTHORIZED) 
    


