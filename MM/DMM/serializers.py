from dataclasses import fields
from rest_framework import serializers
from .models import *




class ServiceAffectationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ServiceAffectation
        fields = ['id', 'service', 'type']

class ServiceAffectationListSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='service')

    class Meta:
        model = ServiceAffectation
        fields = ['id', 'label']


class FournisseurSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fournisseur
        fields = ['id', 'company_name', 'phone_number', 'email']


class FournisseurListSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='company_name')

    class Meta:
        model = Fournisseur
        fields = ['id', 'label']


class FamilleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Famille
        fields = ['id', 'famille_name']


class FamilleListSerializer(serializers.ModelSerializer):
    
    label = serializers.CharField(source='famille_name')

    class Meta:
        model = Famille
        fields = ['id', 'label']




class MaterielTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaterielType
        fields = ['id', 'designation', 'famille']


class MaterielTypeListSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='designation')

    class Meta:
        model = MaterielType
        fields = ['id', 'label']


class MaterielSerializer(serializers.ModelSerializer):

    class Meta:
        model = Materiel
        fields = ['id', 'materiel_type', 'marque', 'date_acquisition', 'fournisseur', 'service_affectation', 'state']

