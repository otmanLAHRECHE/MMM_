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

import Grid from '@mui/material/Grid';
import Alt from '../layouts/alert';
import {getAllServiceAffectation, getSelectedServiceAffectation, createServiceAffectation, updateServiceAffectation, deleteServiceAffectation} from '../../actions/service_affectation_API'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'service', headerName: 'Service', width: 180 },
    { field: 'type', headerName: 'Type de service', width: 150 },
];




export default function ServiceAffectation(){

  const [service, setService] = React.useState([]);
  const [type, setType] = React.useState([]);

  const [serviceError, setServiceError] = React.useState([false, ""]);
  const [typeError, setTypeError] = React.useState([false, ""]);

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
  const [typeValue, setTypeValue] = React.useState();

  const addServiceAffectationOpen = () =>{
    setOpen(true);
    setService("");
    setType("")
    setServiceError([false, ""]);
    setTypeError([false, ""]);
  }

  const editServiceAffectationOpen = async () =>{
     
    if(selectionModel.length == 0){
      setSelectionError(true);
    }else{    
      const token = localStorage.getItem("auth_token");

      setRowData(await getSelectedServiceAffectation(token, selectionModel[0])); 
    }

  }

  const addServiceAffectationClose = () =>{

    setOpen(false);

  }

  const updateServiceAffectationClose = () =>{
    setOpenUpdate(false);

  }

  const deleteServiceAffectationOpen = () =>{
    if(selectionModel.length == 0){
      setSelectionError(true);
    }else{   
      setOpenDelete(true);
    }

  }

  const deleteServiceAffectationClose = () =>{
    setOpenDelete(false);

  }

  const addServiceAffectationSave = async () =>{
  
    var test = true;

    setServiceError([false, ""])
    setTypeError([false, ""])


    if (service == ""){
      setServiceError([true,"Ce champ est obligatoire"])
      test = false;
    }
    if (type == ""){
      setTypeError([true,"Ce champ est obligatoire"])
      test = false;
    }

    if (test){
      
      setOpen(false);

      const data = {
        service:service,
        type:type,
      }

      console.log("data", JSON.stringify(data));

      const token = localStorage.getItem("auth_token");

      setResponse(await createServiceAffectation(token, JSON.stringify(data))); 
      
    }
    else{
      setLoadError(true);
      console.log("error");

    }

  }

  const updateServiceAffectationSave = async () =>{

    var test = true;

    setServiceError([false, ""]);
    setTypeError([false, ""]);


    if (service == ""){
      setServiceError([true,"Ce champ est obligatoire"])
      test = false;
    }
    if (type == ""){
      setTypeError([true,"Ce champ est obligatoire"])
      test = false;
    }

    if (test){
      setOpen(false);

      const data = {
        service:service,
        type:type,
      }

      console.log("data", JSON.stringify(data));


      const token = localStorage.getItem("auth_token");

      setResponse(await updateServiceAffectation(token, JSON.stringify(data), rowData.id)); 

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
      setResponse(await deleteServiceAffectation(token, selectionModel[0])); 
        
  }

  React.useEffect(() => {
    try{

      if (rowData == "no data"){
        setResponseErrorSignal(true);
      } else if(rowData != "") {

      setOpenUpdate(true);

      setService(rowData.service);

      if(rowData.type == "interne"){
        setTypeValue(1)
      }else if(rowData.type == "externe"){
        setTypeValue(2)
      }else if(rowData.type == "speciale"){
        setTypeValue(3)
      }

      setServiceError([false, ""]);
      setTypeError([false, ""]);

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
          setData(await getAllServiceAffectation(token));
          setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();

  }, [response]);



  const change_type = (event) => {
    if(event.target.value == ""){
      setType("");
    }else if(event.target.value == 1){
      setType("interne");
    }else if(event.target.value == 2){
      setType("externe");
    }else if(event.target.value == 3){
      setType("speciale");
    }
  }

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
                Manager les services d'affectation
                </ListSubheader>
            }
            >
            <ListItemButton onClick={addServiceAffectationOpen}>
                <ListItemIcon>
                <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Ajouter service" />
            </ListItemButton>
            <ListItemButton onClick={editServiceAffectationOpen}>
                <ListItemIcon>
                <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Modifier service" />
            </ListItemButton>
            <ListItemButton onClick={deleteServiceAffectationOpen}>
                <ListItemIcon>
                <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary="Supprimer service" />
            </ListItemButton>
            </List>

    </Grid>
    </Grid>  


    <Dialog open={open} onClose={addServiceAffectationClose}  maxWidth="md" fullWidth={true}>
        <DialogTitle>Ajouter service d'affectation</DialogTitle>
            <DialogContent>
                <TextField
                error={serviceError[0]}
                helperText={serviceError[1]}
                required
                margin="dense"
                name="service_name"
                id="service_name"
                label="Nom de service"
                fullWidth
                variant="standard"
                onChange={(event) => {setService(event.target.value)}}
                />
                <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={typeError[0]}
                                  helperText={typeError[1]}>Type de service</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="Type de service"
                                    onChange={change_type}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={1}>interne</MenuItem>
                                      <MenuItem value={2}>externe</MenuItem>
                                      <MenuItem value={3}>speciale</MenuItem>
                                     
                                    </Select>
                    </FormControl>  
            </DialogContent>
            <DialogActions>
                <Button onClick={addServiceAffectationClose}>Anuller</Button>
                <Button onClick={addServiceAffectationSave}>Sauvgarder</Button>
            </DialogActions>
    </Dialog>


    <Dialog open={openUpdate} onClose={updateServiceAffectationClose}  maxWidth="md" fullWidth={true}>
        <DialogTitle>Modifier un service d'affectation</DialogTitle>
            <DialogContent>
                <TextField
                error={serviceError[0]}
                helperText={serviceError[1]}
                required
                margin="dense"
                name="service_name"
                id="service_name"
                label="Nom de service"
                fullWidth
                variant="standard"
                value={service}
                onChange={(event) => {setService(event.target.value)}}
                />

                <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={typeError[0]}
                                  helperText={typeError[1]}>Type de service</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="Type de service"
                                    onChange={change_type}
                                    value={typeValue}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={1}>interne</MenuItem>
                                      <MenuItem value={2}>externe</MenuItem>
                                      <MenuItem value={3}>speciale</MenuItem>
                                     
                                    </Select>
                    </FormControl>  
                
                
                
                
            </DialogContent>
            <DialogActions>
            <Button onClick={updateServiceAffectationClose}>Anuller</Button>
                <Button onClick={updateServiceAffectationSave}>Sauvgarder</Button>
            </DialogActions>
    </Dialog>


    <Dialog open={openDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={deleteServiceAffectationClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirmer la suppression d'un service"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    Êtes-vous sûr de la décision de supprimer le service ?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={deleteServiceAffectationClose}>Anuller</Button>
                    <Button onClick={deleteConfirmation}>Supprimer</Button>
                    </DialogActions>
    </Dialog>
            
    </Container>


    {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
    {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
    {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
    {selectionError ? <Alt type='warning' message='Selectioner un service' onClose={()=> setSelectionError(false)} /> : null}


    </React.Fragment>


  )


}