from django.db import models

# Create your models here.


class ServiceAffectation(models.Model):
    id = models.AutoField(primary_key=True)
    service = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.service

class Fournisseur(models.Model):
    id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.company_name
    

class Famille(models.Model):
    id = models.AutoField(primary_key=True)
    famille_name = models.CharField(max_length=100)

    def __str__(self):
        return self.famille_name
    

class MaterielType(models.Model):
    id = models.AutoField(primary_key=True)
    designation = models.CharField(max_length=100)
    famille = models.ForeignKey(Famille, on_delete=models.CASCADE)

    def __str__(self):
        return self.designation


class Materiel(models.Model):
    id = models.AutoField(primary_key=True)
    materiel_type = models.ForeignKey(MaterielType, on_delete=models.CASCADE)
    marque = models.CharField(max_length=100)
    date_acquisition = models.DateField()
    fournisseur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    service_affectation = models.ForeignKey(ServiceAffectation, on_delete=models.CASCADE)
    state = models.CharField(max_length=100)

    def __str__(self):
            return self.marque
    

class Affectation(models.Model):
    id = models.AutoField(primary_key=True)
    date_affectation = models.DateField()
    service_aff = models.ForeignKey(ServiceAffectation, on_delete=models.CASCADE)
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    note = models.CharField(max_length=100)

    def __str__(self):
            return self.id
    

class EnPanne(models.Model):
    id = models.AutoField(primary_key=True)
    date_panne = models.DateField()
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    note = models.CharField(max_length=100)

    def __str__(self):
            return self.id
    

class Reparation(models.Model):
    id = models.AutoField(primary_key=True)
    date_reparation = models.DateField()
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    reparateur = models.ForeignKey(Fournisseur, on_delete=models.CASCADE)
    note = models.CharField(max_length=100)

    def __str__(self):
            return self.id
    

class Reforme(models.Model):
    id = models.AutoField(primary_key=True)
    date_reforme = models.DateField()
    materiel = models.ForeignKey(Materiel, on_delete=models.CASCADE)
    note = models.CharField(max_length=100)

    def __str__(self):
            return self.id
    

    
