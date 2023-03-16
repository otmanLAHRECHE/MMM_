from posixpath import basename
from django.urls import path
from .views import *
from DMM import views


urlpatterns = [
    #service affectation
    path('api/get_all_service_affectation/', views.getAllServiceAffectation),
    path('api/get_all_service_affectation_for_selection/', views.getServiceAffectationForSelection),
    path('api/get_selected_service_affectation/<int:id>', views.getSelectedServiceAffectation),
    path('api/create_service_affectation/', views.createServiceAffectation),
    path('api/ubdate_service_affectation/<int:id>', views.updateServiceAffectation),
    path('api/delete_service_affectation/<int:id>', views.deleteServiceAffectation),

    #fournisseur
    path('api/get_all_fournisseur/', views.getAllFournisseurs),
    path('api/get_all_fournisseur_for_selection/', views.getFournisseurForSelection),
    path('api/get_selected_fournisseur/<int:id>', views.getSelectedFournisseurs),
    path('api/create_fournisseur/', views.createFournisseur),
    path('api/ubdate_fournisseur/<int:id>', views.updateFournisseur),
    path('api/delete_fournisseur/<int:id>', views.deleteFournisseur),

    #famille
    path('api/get_all_famille/', views.getFamilles),
    path('api/get_all_famille_for_selection/', views.getFamillesForSelection),
    path('api/get_selected_famille/<int:id>', views.getSelectedFamille),
    path('api/create_famille/', views.createFamille),
    path('api/ubdate_famille/<int:id>', views.updateFamille),
    path('api/delete_famille/<int:id>', views.deleteFamille),

    #material type
    path('api/get_all_material_type/', views.getMaterielType),
    path('api/get_all_material_type_for_selection/', views.getMaterielTypeForSelection),
    path('api/get_selected_material_type/<int:id>', views.getSelectedMaterielType),
    path('api/create_material_type/', views.createMaterialType),
    path('api/ubdate_material_type/<int:id>', views.updateMaterialType),
    path('api/delete_material_type/<int:id>', views.deleteMaterialType),

    #materials
    path('api/get_all_materials/', views.getMateriels),
    path('api/get_selected_material/<int:id>', views.getSelectedMateriels),
    path('api/create_material/', views.createMaterial),
    path('api/ubdate_material/<int:id>', views.updateMaterial),
    path('api/delete_material/<int:id>', views.deleteMaterial),

    #affectatoin
    path('api/get_all_affectation/<int:year>', views.getAffectations),
    path('api/get_selected_affectation/<int:id>', views.getSelectedAffectations),
    path('api/create_affectation/', views.createAffectation),
    path('api/ubdate_affectation/<int:id>', views.updateAffectation),
    path('api/delete_affectation/<int:id>', views.deleteAffectation),

    #panne
    path('api/get_all_pannes/<int:year>', views.getEnPanne),
    path('api/get_selected_panne/<int:id>', views.getSelectedEnPanne),
    path('api/create_panne/', views.createEnPanne),
    path('api/ubdate_panne/<int:id>', views.updateEnPanne),
    path('api/delete_panne/<int:id>', views.deleteEnPanne),

    #reparation
    path('api/get_all_reparation/<int:year>', views.getReparation),
    path('api/get_selected_reparation/<int:id>', views.getSelectedReparation),
    path('api/create_reparation/', views.createReparation),
    path('api/ubdate_reparation/<int:id>', views.updateReparation),
    path('api/delete_reparation/<int:id>', views.deleteReparation),

    #reforme
    path('api/get_all_reforme/<int:year>', views.getReforme),
    path('api/get_selected_reforme/<int:id>', views.getSelectedReforme),
    path('api//', views.createReforme),
    path('api/ubdate_reforme/<int:id>', views.updateReforme),
    path('api/delete_reforme/<int:id>', views.deleteReforme),

   
]