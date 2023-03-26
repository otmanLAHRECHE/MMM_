import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Alt from '../layouts/alert';

import SortieItemsTable from '../layouts/sortie_items_table';
import { getMaterielTypeForSelection } from '../../actions/materialTypeAPI';
import { getServiceAffectationForSelection } from '../../actions/service_affectation_API';
import { getFournisseurForSelection } from '../../actions/fournisseurAPI';
import { internal_processStyles } from '@mui/styled-engine';
import { getMateriels, getSelectedMateriels, createMaterial, updateMaterial, deleteMaterial} from '../../actions/materialsAPI';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'num_inv', headerName: "Num d'inventaire", width: 150 },
    { field: 'materiel_type', headerName: 'Designation', width: 100, valueGetter: (params) =>
    `${params.row.materiel_type.designation || ''}` },
    { field: 'marque', headerName: 'Marsue', width: 170},
    { field: 'date_acquisition', headerName: "Date d'acquisition", width: 200 },
    { field: 'fournisseur', headerName: 'Fourniseur', width: 200, valueGetter: (params) =>
    `${params.row.fournisseur.company_name || ''}` },
    { field: 'service_affectation', headerName: "Service d'affectation", width: 180, valueGetter: (params) =>
    `${params.row.service_affectation.service || ''}` },
    { field: 'state', headerName: 'Etat', width: 140},
    
  ];




  export default function Materials(){

    const [materialType, setMaterialType] = React.useState(null);
    const [marque, setMarque] = React.useState("");
    const [dateAcquisition, setDateAcquisition] = React.useState("");
    const [fournisseur, setFournisseur] = React.useState(null);
    const [serviceAffectation, setServiceAffectation] = React.useState(null);
    const [numInventaire, setNumInventaire] = React.useState("");

    const [materialTypeError, setMaterialTypeError] = React.useState([false, ""]);
    const [marqueError, setMarqueError] = React.useState([false, ""]);
    const [dateAcquisitionError, setDateAcquisitionError] = React.useState([false, ""]);
    const [fournisseurError, setFournisseurError] = React.useState([false, ""]);
    const [serviceAffectationError, setServiceAffectationError] = React.useState([false, ""]);
    const [numInventaireError, setNumInventaireError] = React.useState([false, ""]);


    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [allMaterialTypes, setAllMaterialTypes] = React.useState([]);
    const [allFournisseur, setAllFournisseur] = React.useState([]);
    const [allServiceAffectation, setAllServiceAffectation] = React.useState([]);

    const [data, setData] = React.useState([]);
    const [fournisseurData, setFournisseurData] = React.useState([]);
    const [serviceAffectationData, setServiceAffectationData] = React.useState([]);
    const [materialTypeData, setMaterialTypeData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");
    const [loadingSortieItem, setLoadingSortieItem] = React.useState(false);

    const [dataError, setDataError] = React.useState(false);


    const addMaterialOpen = async () =>{

        setMaterialType(null);
        setMarque("");
        setDateAcquisition("");
        setServiceAffectation(null);
        setFournisseur(null);
        setNumInventaire("");

        
        setMaterialTypeError([false, ""]);
        setMarqueError([false, ""]);
        setDateAcquisitionError([false, ""]);
        setServiceAffectationError([false, ""]);
        setFournisseurError([false, ""]);
        setNumInventaireError([false, ""]);

        const token = localStorage.getItem("auth_token");
        setFournisseurData(await getFournisseurForSelection(token));
        setMaterialTypeData(await getMaterielTypeForSelection(token));
        setServiceAffectationData(await getServiceAffectationForSelection(token));

    }

    const addMaterialClose = () =>{
      setOpen(false);
    }

    const addMaterialSave = async () =>{

      var test = true;

      if(materialType == null || materialType == ""){
          test = false;
          setMaterialTypeError([true, "ce champ est obligatoire"])
      }

      if(marque == null || marque == ""){
        test = false;
        setMarqueError([true, "ce champ est obligatoire"])
      }

      if(marque == null || marque == ""){
        test = false;
        setMarqueError([true, "ce champ est obligatoire"])
      }



      

      if (test){

          if (Number(currentStockItem.stock_qte)< Number(qnt)){
              setSortieQntError(true);
          }else{
              const token = localStorage.getItem("auth_token");
              setIdChecker(await checkBonSortieId(token, Number(idBonSortie)));
          }

          

      }
  }

    


    React.useEffect(()=>{
      try{
        if (fournisseurData == "no data"){
          setResponseErrorSignal(true);
        } else if(fournisseurData != "") {
          setAllFournisseur(fournisseurData);
          setOpen(true);
        }
      }catch(e){
        console.log(e);
      }

    },[fournisseurData]);

    React.useEffect(()=>{
      try{
        if (serviceAffectationData == "no data"){
          setResponseErrorSignal(true);
        } else if(serviceAffectationData != "") {
          setAllServiceAffectation(serviceAffectationData);
          setOpen(true);
        }
      }catch(e){
        console.log(e);
      }

    },[serviceAffectationData]);

    React.useEffect(()=>{
      try{
        if (materialTypeData == "no data"){
          setResponseErrorSignal(true);
        } else if(materialTypeData != "") {
          setAllMaterialTypes(materialTypeData);
          setOpen(true);
        }
      }catch(e){
        console.log(e);
      }

    },[materialTypeData]);


    return(

        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}>


            <Grid item xs={12}>

            <Box
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '& > *': {
                      m: 1,
                      },
                  }}
              >
              <ButtonGroup variant="text" aria-label="outlined primary button group">
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addBonSortieItemOpen}>Ajouter materiel</Button>
                <Button startIcon={<EditAttributesIcon />} onClick={editBonSortieItemOpen}>Modifier materiel</Button>
                <Button startIcon={<DeleteForeverIcon />} onClick={deleteBonSortieItemOpen}>Supprimer materiel</Button>
              </ButtonGroup>
            </Box>
              
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 700, width: '100%' }}>
                        <DataGrid
                          components={{
                            Toolbar: GridToolbar,
                          }}
                            rows={data}
                            columns={columns}
                            pageSize={15}
                            checkboxSelection = {false}
                            loading={loading}
                            disableMultipleSelection={true}
                            onSelectionModelChange={(newSelectionModel) => {
                              setSelectionModel(newSelectionModel);
                            }}
                            selectionModel={selectionModel}
                            
                            
                        />
                  </div>   
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />

          <Dialog open={open} onClose={addBonSortieClose}  maxWidth="lg" fullWidth={true}>
                <DialogTitle>Ajouter un Materiel</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <TextField
                                                error={idBonSortieError[0]}
                                                helperText={idBonSortieError[1]}
                                                margin="dense"
                                                id="bon_sortie_nbr"
                                                label="Id de bon sortie"
                                                fullWidth
                                                variant="standard"
                                                type="number"
                                                onChange={(event) => {setIdBonSortie(event.target.value)}}
                                        />

                                      </Grid>
                                      <Grid item xs={4}>
                                            <Autocomplete
                                                disablePortal
                                                value={medicName}
                                                onChange={async (event, newVlue) =>{
                                                    setMedicName(newVlue);

                                                    if (newVlue != null){
                                                        const token = localStorage.getItem("auth_token");
                                                        setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));
                                                    }else{
                                                        setAllArivage([]);
                                                    }                                                                                                
                                                }}
                                                id="combo-box-demo"
                                                options={allNames}
                                                renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                                helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                                required/>}
                                            /> 
                                      
                                      </Grid>

                                      <Grid item xs={4}>
                                                <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={arivage}
                                                            onChange={async (event, newVlue) =>{
                                                                setArivage(newVlue);

                                                                if(newVlue == null){
                                                                    console.log("arrivage...",newVlue);

                                                                }else{
                                                                    const token = localStorage.getItem("auth_token");
                                                                    setCurrentStockItem(await getSelectedStock(token, newVlue.id));

                                                                }                                                                

                                                            }}
                                                            options={allArivage}
                                                            renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                            helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                            required/>}
                                                        />                                                                                      
                                      </Grid>

                                      <Grid item xs={6}>
                                            <TextField
                                                error={qntError[0]}
                                                helperText={qntError[1]}
                                                required
                                                margin="dense"
                                                label="Qnt"
                                                fullWidth
                                                variant="standard"
                                                value = {qnt}
                                                onChange={(event) => {setQnt(event.target.value)}}
                                            />

                                      </Grid>                
                    </Grid>
                  </DialogContent>
                            <DialogActions>
                              <Button onClick={addBonSortieClose}>Anuller</Button>
                              <Button onClick={addBonSortieSave}>Sauvgarder</Button>
                            </DialogActions>   

                  
          </Dialog>

          <Dialog open={openUpdate} onClose={editBonSortieItemClose}  maxWidth="lg" fullWidth={true}>
          <DialogTitle>Ajouter un bon de sortie item</DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                                      <Grid item xs={4}>
                                        <TextField
                                                error={idBonSortieError[0]}
                                                helperText={idBonSortieError[1]}
                                                disabled={true}
                                                margin="dense"
                                                id="bon_sortie_nbr"
                                                label="Id de bon sortie"
                                                fullWidth
                                                variant="standard"
                                                type="number"
                                                onChange={(event) => {setIdBonSortie(event.target.value)}}
                                        />

                                      </Grid>
                                      <Grid item xs={4}>
                                            <Autocomplete
                                                disablePortal
                                                value={medicName}
                                                disabled={true}
                                                onChange={async (event, newVlue) =>{
                                                    setMedicName(newVlue);

                                                    if (newVlue != null){
                                                        const token = localStorage.getItem("auth_token");
                                                        setArrivageData(await getAllArrivageOfMedic(token, newVlue.id));
                                                    }else{
                                                        setAllArivage([]);
                                                    }                                                                                                
                                                }}
                                                id="combo-box-demo"
                                                options={allNames}
                                                renderInput={(params) => <TextField {...params} error={medicNameError[0]}
                                                helperText={medicNameError[1]} fullWidth variant="standard" label="Médicaments" 
                                                required/>}
                                            /> 
                                      
                                      </Grid>

                                      <Grid item xs={4}>
                                                <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            value={arivage}
                                                            disabled={true}
                                                            onChange={async (event, newVlue) =>{
                                                                setArivage(newVlue);

                                                                if(newVlue == null){
                                                                    console.log("arrivage...",newVlue);

                                                                }else{
                                                                    const token = localStorage.getItem("auth_token");
                                                                    setCurrentStockItem(await getSelectedStock(token, newVlue.id));

                                                                }                                                                

                                                            }}
                                                            options={allArivage}
                                                            renderInput={(params) => <TextField {...params} error={arivageError[0]}
                                                            helperText={arivageError[1]} fullWidth variant="standard" label="Arrivage" 
                                                            required/>}
                                                        />                                                                                      
                                      </Grid>

                                      <Grid item xs={6}>
                                            <TextField
                                                error={qntError[0]}
                                                helperText={qntError[1]}
                                                required
                                                margin="dense"
                                                label="Qnt"
                                                fullWidth
                                                variant="standard"
                                                value = {qnt}
                                                onChange={(event) => {setQnt(event.target.value)}}
                                            />

                                      </Grid>                
                    </Grid>
                  </DialogContent>
                            <DialogActions>
                              <Button onClick={editBonSortieItemClose}>Anuller</Button>
                              <Button onClick={editBonSortieItemSave}>Sauvgarder</Button>
                            </DialogActions> 

                  
          </Dialog>

          <Dialog open={openDelete}
                                  TransitionComponent={Transition}
                                  keepMounted
                                  onClose={deleteBonSortieItemClose}
                                  aria-describedby="alert-dialog-slide-description"
                                >
                                  <DialogTitle>{"Confirmer la suppression d'un bon de sortie Item"}</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                    Êtes-vous sûr de la décision de supprimer le bon de sortie item, la quantite de médicament sortie sur ce item sera annuler et l'etat de stock reviens a etat prévédente?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={deleteBonSortieItemClose}>Anuller</Button>
                                    <Button onClick={deleteConfirmation}>Supprimer</Button>
                                  </DialogActions>
           </Dialog>
          
        </Container>


          {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
          {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
          {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
          {selectionError ? <Alt type='error' message='Selectioner un materiel' onClose={()=> setSelectionError(false)} /> : null}
          
          
        </React.Fragment>

    );



  }