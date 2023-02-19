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
import { addNewLaboriste, deleteLaboriste, getAllLaboriste, getSelectedLaboriste, updateLaboriste } from '../../actions/laboriste_data';


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'first_name', headerName: 'Nom', width: 180 },
    { field: 'last_name', headerName: 'Prénom', width: 180 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




  export default function Laboristes(){


    const [laboristeFirstName, setLaboristeFirstName] = React.useState("");
    const [laboristeLastName, setLaboristeLastName] = React.useState("");

    const [laboristeFirstNameError, setLaboristeFirstNameError] = React.useState([false, ""]);
    const [laboristeLastNameError, setLaboristeLastNameError] = React.useState([false, ""]);

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


    const addLaboristeOpen = () =>{
        setOpen(true);
        setLaboristeFirstName("");
        setLaboristeLastName("");
  
        setLaboristeFirstNameError([false, ""]);
        setLaboristeLastNameError([false, ""]);
  
      }
  
      const editLaboristeOpen = async () =>{
       
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{    
          const token = localStorage.getItem("auth_token");
  
          setRowData(await getSelectedLaboriste(token, selectionModel[0])); 
        }
  
      }
  
      const addLaboristeClose = () =>{
  
        setOpen(false);
  
      }
  
      const updateLaboristeClose = () =>{
        setOpenUpdate(false);
  
      }
  
      const deleteLaboristeOpen = () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
  
      }
  
      const deleteLaboristeClose = () =>{
        setOpenDelete(false);
  
      }


      const addLaboristeSave = async () =>{

        var test = true;
  
        setLaboristeFirstNameError([false, ""]);
        setLaboristeLastNameError([false, ""]);
  
  
        if (laboristeFirstName == ""){
          setLaboristeFirstNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (laboristeLastName == ""){
          setLaboristeLastNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            first_name:laboristeFirstName,
            last_name:laboristeLastName,
          }  
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await addNewLaboriste(token, JSON.stringify(data))); 
          
        }
        else{
          setLoadError(true);
          console.log("error");
  
        }
  
      }

      const updateLaboristeSave = async () =>{
  
        var test = true;
  
        setLaboristeFirstNameError([false, ""]);
        setLaboristeLastNameError([false, ""]);
  
  
        if (laboristeFirstName == ""){
          setLaboristeFirstNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (laboristeLastName == ""){
          setLaboristeLastNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            first_name:laboristeFirstName,
            last_name:laboristeLastName,
          }
          const token = localStorage.getItem("auth_token");
  
          setResponse(await updateLaboriste(token, JSON.stringify(data), rowData.id)); 
  
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
        setResponse(await deleteLaboriste(token, selectionModel[0])); 
          
      }


      React.useEffect(() => {
  
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);
          console.log(rowData.id)
    
          setLaboristeFirstName(rowData.first_name);
          setLaboristeLastName(rowData.last_name);
  
          setLaboristeFirstNameError([false, ""]);
          setLaboristeLastNameError([false, ""]);
  
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
              console.log("token",token)
              setData(await getAllLaboriste(token));
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
                                  Manager les laboriste
                                </ListSubheader>
                              }
                            >
                              <ListItemButton onClick={addLaboristeOpen}>
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ajoute un laboriste" />
                              </ListItemButton>
                              <ListItemButton onClick={editLaboristeOpen}>
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="Modifier un laboriste" />
                              </ListItemButton>
                              <ListItemButton onClick={deleteLaboristeOpen}>
                                <ListItemIcon>
                                  <DeleteForeverIcon />
                                </ListItemIcon>
                                <ListItemText primary="Supprime un laboriste" />
                              </ListItemButton>
                            </List>
    
                      </Grid>
                    </Grid>  
    
    
                      <Dialog open={open} onClose={addLaboristeClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Ajouter un laboriste</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={laboristeFirstNameError[0]}
                                  helperText={laboristeFirstNameError[1]}
                                  required
                                  margin="dense"
                                  name="laboriste_first_name"
                                  id="laboriste_first_name"
                                  label="Nom de laboriste"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setLaboristeFirstName(event.target.value)}}
                                />
                                <TextField
                                  error={laboristeLastNameError[0]}
                                  helperText={laboristeLastNameError[1]}
                                  required
                                  margin="dense"
                                  id="laboriste_last_name"
                                  label="Prénom de laboriste"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setLaboristeLastName(event.target.value)}}
                                />                                                              
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addLaboristeClose}>Anuller</Button>
                                <Button onClick={addLaboristeSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openUpdate} onClose={updateLaboristeClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Modifier un laboriste</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={laboristeFirstNameError[0]}
                                  helperText={laboristeFirstNameError[1]}
                                  required
                                  margin="dense"
                                  name="laboriste_first_name"
                                  id="laboriste_first_name"
                                  label="Nom de laboriste"
                                  fullWidth
                                  variant="standard"
                                  value={laboristeFirstName}
                                  onChange={(event) => {setLaboristeFirstName(event.target.value)}}
                                />
                                <TextField
                                  error={laboristeLastNameError[0]}
                                  helperText={laboristeLastNameError[1]}
                                  required
                                  margin="dense"
                                  id="laboriste_laste_name"
                                  label="Prénom de laboriste"
                                  fullWidth
                                  variant="standard"
                                  value={laboristeLastName}
                                  onChange={(event) => {setLaboristeLastName(event.target.value)}}
                                />                                
                                  
                              </DialogContent>
                              <DialogActions>
                              <Button onClick={updateLaboristeClose}>Anuller</Button>
                                <Button onClick={updateLaboristeSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteLaboristeClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un laboriste"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le laboriste ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteLaboristeClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
                             
            </Container>
    
    
            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un laboriste' onClose={()=> setSelectionError(false)} /> : null}
          
            </React.Fragment>
    
    
        )
  





  }


