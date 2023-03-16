

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


import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import {getFamilles, getSelectedFamille, createFamille, updateFamille, deleteFamille} from '../../actions/familleAPI'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'famille_name', headerName: 'Nom de famille', width: 180 },
];


export default function Famille(){

    const [familleName, setFamilleName] = React.useState("")

    const [familleNameError, setfamilleNameError] = React.useState([false, ""]);

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [rowData, setRowData] = React.useState("");

    const addFamilleNameOpen = () =>{
        setOpen(true);
        setFamilleName("");
  
        setfamilleNameError([false, ""])
  
    }

    const editfamilleNameOpen = async () =>{
     
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{    
          const token = localStorage.getItem("auth_token");
  
          setRowData(await getSelectedFamille(token, selectionModel[0])); 
        }
  
    }

    const addfamilleNameClose = () =>{

        setOpen(false);
  
    }
  
    const updatefamilleNameClose = () =>{
        setOpenUpdate(false);
  
    }
  
    const deletefamilleNameOpen = () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
  
    }
  
    const deletefamilleNameClose = () =>{
        setOpenDelete(false);
  
    }
  
    const addfamilleNameSave = async () =>{
  
        var test = true;
  
        setfamilleNameError([false, ""])
  
  
        if (familleName == ""){
          setfamilleNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            famille_name:familleName,
          }
  
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await createFamille(token, JSON.stringify(data))); 
          
        }
        else{
          setLoadError(true);
          console.log("error");
  
        }
  
    }

    const updatefamilleNameSave = async () =>{

        var test = true;
  
        setfamilleNameError([false, ""])
  
  
        if (familleName == ""){
          setfamilleNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            famille_name:familleName,
          }
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await updateFamille(token, JSON.stringify(data), rowData.id)); 
  
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
        setResponse(await deleteFamille(token, selectionModel[0])); 
          
    }
  
      
  
    React.useEffect(() => {
        console.log(rowData);
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);
          console.log(rowData.id)
    
          setFamilleName(rowData.famille_name);
  
          setfamilleNameError([false, ""])
  
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
              setData(await getFamilles(token));
              setLoading(false);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          fetchData();
    
    }, [response]);






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
                    Manager les familles des materiels
                    </ListSubheader>
                }
                >
                <ListItemButton onClick={addFamilleNameOpen}>
                    <ListItemIcon>
                    <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ajouter famille" />
                </ListItemButton>
                <ListItemButton onClick={editfamilleNameOpen}>
                    <ListItemIcon>
                    <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Modifier famille" />
                </ListItemButton>
                <ListItemButton onClick={deletefamilleNameOpen}>
                    <ListItemIcon>
                    <DeleteForeverIcon />
                    </ListItemIcon>
                    <ListItemText primary="Supprimer famille" />
                </ListItemButton>
                </List>

        </Grid>
        </Grid>  


        <Dialog open={open} onClose={addfamilleNameClose}  maxWidth="md" fullWidth={true}>
            <DialogTitle>Ajouter Famille de materiel</DialogTitle>
                <DialogContent>
                    <TextField
                    error={familleNameError[0]}
                    helperText={familleNameError[1]}
                    required
                    margin="dense"
                    name="famille_name"
                    id="famille_name"
                    label="Nom de famille"
                    fullWidth
                    variant="standard"
                    onChange={(event) => {setFamilleName(event.target.value)}}
                    />
                    
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={addfamilleNameClose}>Anuller</Button>
                    <Button onClick={addfamilleNameSave}>Sauvgarder</Button>
                </DialogActions>
        </Dialog>


        <Dialog open={openUpdate} onClose={updatefamilleNameClose}  maxWidth="md" fullWidth={true}>
            <DialogTitle>Modifier un Famille de materiel</DialogTitle>
                <DialogContent>
                    <TextField
                    error={familleNameError[0]}
                    helperText={familleNameError[1]}
                    required
                    margin="dense"
                    name="famille_name"
                    id="famille_name"
                    label="Nom de famille"
                    fullWidth
                    variant="standard"
                    value={familleName}
                    onChange={(event) => {setFamilleName(event.target.value)}}
                    />
                    
                    
                </DialogContent>
                <DialogActions>
                <Button onClick={updatefamilleNameClose}>Anuller</Button>
                    <Button onClick={updatefamilleNameSave}>Sauvgarder</Button>
                </DialogActions>
        </Dialog>


        <Dialog open={openDelete}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={deletefamilleNameClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Confirmer la suppression d'un fournisseur"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        Êtes-vous sûr de la décision de supprimer la famille de materiel ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={deletefamilleNameClose}>Anuller</Button>
                        <Button onClick={deleteConfirmation}>Supprimer</Button>
                        </DialogActions>
        </Dialog>
                
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='warning' message='Selectioner un famille' onClose={()=> setSelectionError(false)} /> : null}


        </React.Fragment>

    )
}