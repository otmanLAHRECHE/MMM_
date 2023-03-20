import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import {getMaterielType, getSelectedMaterielType, createMaterialType, updateMaterialType, deleteMaterialType} from '../../actions/materialTypeAPI'

import {getFamillesForSelection} from '../../actions/familleAPI'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'designation', headerName: 'Designation', width: 180 },
    { field: 'famille', headerName: 'Famille', width: 150 , valueGetter: (params) =>
    `${params.row.famille.famille_name || ''}` },
  ];




export default function TypeMateriel(){

  const [designation, setDesignation] = React.useState("");
  const [famille, setFamille] = React.useState(null);

  const [designationError, setDesignationError] = React.useState([false, ""]);
  const [familleError, setFamilleError] = React.useState([false, ""]);

  const [loadError, setLoadError ] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
  const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);


  const [callBack, setCallBack] = React.useState("");

  const [allFamille, setAllFamille] = React.useState([]);

  const [data, setData] = React.useState([]);
  const [familleData, setFamilleData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [selectionError, setSelectionError] = React.useState(false);
  const [rowData, setRowData] = React.useState("");

  const addTypeMaterialOpen = async () =>{
    setOpen(true);
    setDesignation("");
    setFamille(null)
    setDesignationError([false, ""]);
    setFamilleError([false, ""]);

    const token = localStorage.getItem("auth_token");

    setFamilleData(await getFamillesForSelection(token));
  }

  const editTypeMedicalOpen = async () =>{
     
    if(selectionModel.length == 0){
      setSelectionError(true);
    }else{    
      const token = localStorage.getItem("auth_token");

      setRowData(await getSelectedMaterielType(token, selectionModel[0])); 

      setFamilleData(await getFamillesForSelection(token));
    }

  }

  const addTypeMedicalClose = () =>{

    setOpen(false);

  }

  const updateTypeMedicalClose = () =>{
    setOpenUpdate(false);

  }

  const deleteTypeMedicalOpen = () =>{
    if(selectionModel.length == 0){
      setSelectionError(true);
    }else{   
      setOpenDelete(true);
    }

  }

  const deleteTypeMedicalClose = () =>{
    setOpenDelete(false);

  }

  const addTypeMedicalSave = async () =>{
  
    var test = true;

    setDesignationError([false, ""])
    setFamilleError([false, ""])


    if (designation == ""){
      setDesignationError([true,"Ce champ est obligatoire"])
      test = false;
    }
    if (famille == null){
      setFamilleError([true,"Ce champ est obligatoire"])
      test = false;
    }

    if (test){
      
      setOpen(false);

      const data = {
        designation:designation,
        famile_id:famille.id,
      }

      const token = localStorage.getItem("auth_token");

      setResponse(await createMaterialType(token, JSON.stringify(data))); 
      
    }
    else{
      setLoadError(true);
      console.log("error");

    }

  }

  const updateTypeMaterialSave = async () =>{

    var test = true;

    setDesignationError([false, ""]);
    setFamilleError([false, ""]);


    if (designation == ""){
      setDesignationError([true,"Ce champ est obligatoire"])
      test = false;
    }
    if (famille == null || famille == ""){
      setFamilleError([true,"Ce champ est obligatoire"])
      test = false;
    }

    if (test){
      setOpen(false);

      const data = {
        designation:designation,
        famile_id:famille.id,
      }

      console.log("data", JSON.stringify(data));


      const token = localStorage.getItem("auth_token");

      setResponse(await updateMaterialType(token, JSON.stringify(data), rowData.id)); 

      setOpenUpdate(false);
      
    }
    else{
      setLoadError(true);
      console.log("error");

    }
      
  }

  const deleteConfirmation = async () =>{

      setOpenDelete(false);
      const token = localStorage.getItem("auth_token");
      setResponse(await deleteMaterialType(token, selectionModel[0])); 
        
  }

  React.useEffect(() => {
    try{

      if (rowData == "no data"){
        setResponseErrorSignal(true);
      } else if(rowData != "") {

      setOpenUpdate(true);

      setDesignation(rowData.designation);

      setFamille({"id":rowData.famille.id, "label":rowData.famille.famille_name});

      setDesignationError([false, ""]);
      setFamilleError([false, ""]);

      }
    }catch(e){
      console.log(e)
    }

  }, [rowData]);

  React.useEffect(() => {

      console.log(response);

      if (response == "error"){
        setResponseErrorSignal(true);
      } else if(response != "") {
        setResponseSuccesSignal(true);
      }

  }, [response]);

  React.useEffect(() => {

      setLoading(true);

      const fetchData = async () => {
        try {
          const token = localStorage.getItem("auth_token");
          setData(await getMaterielType(token));
          setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();

  }, [response]);

  React.useEffect(() =>{
    try{
      if (familleData == "no data"){
        setResponseErrorSignal(true);
      } else if(familleData != "") {
        setAllFamille(familleData);
      }
    }catch(e){
      console.log(e);
    }
  }, [familleData]);



  return(
    <React.Fragment>

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

    <Grid container spacing={1.5}>
    <Grid item xs={9}>
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
    <Grid item xs={3}>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Manager les types des materiels
                </ListSubheader>
            }
            >
            <ListItemButton onClick={addTypeMaterialOpen}>
                <ListItemIcon>
                <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Ajouter type" />
            </ListItemButton>
            <ListItemButton onClick={editTypeMedicalOpen}>
                <ListItemIcon>
                <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Modifier type" />
            </ListItemButton>
            <ListItemButton onClick={deleteTypeMedicalOpen}>
                <ListItemIcon>
                <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary="Supprimer type" />
            </ListItemButton>
            </List>

    </Grid>
    </Grid>  


    <Dialog open={open} onClose={addTypeMedicalClose}  maxWidth="md" fullWidth={true}>
        <DialogTitle>Ajouter un type de materiel</DialogTitle>
            <DialogContent>
                <TextField
                error={designationError[0]}
                helperText={designationError[1]}
                required
                margin="dense"
                name="designation"
                id="designation"
                label="Designation"
                fullWidth
                variant="standard"
                onChange={(event) => {setDesignation(event.target.value)}}
                />
                
                <Autocomplete
                          disablePortal
                          value={famille}
                          onChange={(event, newVlue) =>{
                                    setFamille(newVlue);
                                     }}
                          options={allFamille}
                          renderInput={(params) => <TextField {...params} error={familleError[0]}
                          helperText={familleError[1]} fullWidth variant="standard" label="Famille de materiel" 
                          required/>}/>                 
            </DialogContent>
            <DialogActions>
                <Button onClick={addTypeMedicalClose}>Anuller</Button>
                <Button onClick={addTypeMedicalSave}>Sauvgarder</Button>
            </DialogActions>
    </Dialog>


    <Dialog open={openUpdate} onClose={updateTypeMedicalClose}  maxWidth="md" fullWidth={true}>
        <DialogTitle>Modifier un type de materiel</DialogTitle>
            <DialogContent>
                <TextField
                error={designationError[0]}
                helperText={designationError[1]}
                required
                margin="dense"
                name="designation"
                id="designation"
                label="Designation"
                fullWidth
                variant="standard"
                value={designation}
                onChange={(event) => {setDesignation(event.target.value)}}
                />

                  <Autocomplete
                          disablePortal
                          value={famille}
                          onChange={(event, newVlue) =>{
                                    setFamille(newVlue);
                                     }}
                          options={allFamille}
                          renderInput={(params) => <TextField {...params} error={familleError[0]}
                          helperText={familleError[1]} fullWidth variant="standard" label="Famille de materiel" 
                          required/>}/> 

            </DialogContent>
            <DialogActions>
            <Button onClick={updateTypeMedicalClose}>Anuller</Button>
                <Button onClick={updateTypeMaterialSave}>Sauvgarder</Button>
            </DialogActions>
    </Dialog>


    <Dialog open={openDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={deleteTypeMedicalClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmer la suppression d'un type"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    Êtes-vous sûr de la décision de supprimer le type ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={deleteTypeMedicalClose}>Anuller</Button>
                    <Button onClick={deleteConfirmation}>Supprimer</Button>
                    </DialogActions>
    </Dialog>
            
    </Container>


    {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
    {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
    {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
    {selectionError ? <Alt type='warning' message='Selectioner un type' onClose={()=> setSelectionError(false)} /> : null}


    </React.Fragment>


  )


}