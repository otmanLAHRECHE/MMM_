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
import { addNewInfirmier, deleteInfirmier, getAllInfirmier, getSelectedInfirmier, updateInfirmier } from '../../actions/inf_prelevement_data';


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'first_name', headerName: 'Nom', width: 180 },
    { field: 'last_name', headerName: 'Prénom', width: 180 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  export default function Inf_prelevement(){

    const [infFirstName, setInfFirstName] = React.useState("");
    const [infLastName, setInfLastName] = React.useState("");

    const [infFirstNameError, setInfFirstNameError] = React.useState([false, ""]);
    const [infLastNameError, setInfLastNameError] = React.useState([false, ""]);

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


    const addInfOpen = () =>{
        setOpen(true);
        setInfFirstName("");
        setInfLastName("");
  
        setInfFirstNameError([false, ""]);
        setInfLastNameError([false, ""]);
  
      }
  
      const editInfOpen = async () =>{
       
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{    
          const token = localStorage.getItem("auth_token");
  
          setRowData(await getSelectedInfirmier(token, selectionModel[0])); 
        }
  
      }
  
      const addInfClose = () =>{
  
        setOpen(false);
  
      }
  
      const updateInfClose = () =>{
        setOpenUpdate(false);
  
      }
  
      const deleteInfOpen = () =>{
        if(selectionModel.length == 0){
          setSelectionError(true);
        }else{   
          setOpenDelete(true);
        }
  
      }
  
      const deleteInfClose = () =>{
        setOpenDelete(false);
  
      }


      const addInfSave = async () =>{

        var test = true;
  
        setInfFirstNameError([false, ""]);
        setInfLastNameError([false, ""]);
  
  
        if (infFirstName == ""){
          setInfFirstNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (infLastName == ""){
          setInfLastNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            first_name:infFirstName,
            last_name:infLastName,
          }  
  
          const token = localStorage.getItem("auth_token");
  
          setResponse(await addNewInfirmier(token, JSON.stringify(data))); 
          
        }
        else{
          setLoadError(true);
          console.log("error");
  
        }
  
      }

      const updateInfSave = async () =>{
  
        var test = true;
  
        setInfFirstNameError([false, ""]);
        setInfLastNameError([false, ""]);
  
  
        if (infFirstName == ""){
          setInfFirstNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
        if (infLastName == ""){
          setInfLastNameError([true,"Ce champ est obligatoire"])
          test = false;
        }
  
        if (test){
          setOpen(false);
  
          const data = {
            first_name:infFirstName,
            last_name:infLastName,
          }
          const token = localStorage.getItem("auth_token");
  
          setResponse(await updateInfirmier(token, JSON.stringify(data), rowData.id)); 
  
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
        setResponse(await deleteInfirmier(token, selectionModel[0])); 
          
      }


      React.useEffect(() => {
  
        try{
  
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {
    
          setOpenUpdate(true);
          console.log(rowData.id)
    
          setInfFirstName(rowData.first_name);
          setInfLastName(rowData.last_name);
  
          setInfFirstNameError([false, ""]);
          setInfLastNameError([false, ""]);
  
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
              setData(await getAllInfirmier(token));
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
                                  Manager les infirmier
                                </ListSubheader>
                              }
                            >
                              <ListItemButton onClick={addInfOpen}>
                                <ListItemIcon>
                                  <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ajoute un infirmier" />
                              </ListItemButton>
                              <ListItemButton onClick={editInfOpen}>
                                <ListItemIcon>
                                  <EditIcon />
                                </ListItemIcon>
                                <ListItemText primary="Modifier un infirmier" />
                              </ListItemButton>
                              <ListItemButton onClick={deleteInfOpen}>
                                <ListItemIcon>
                                  <DeleteForeverIcon />
                                </ListItemIcon>
                                <ListItemText primary="Supprime un infirmier" />
                              </ListItemButton>
                            </List>
    
                      </Grid>
                    </Grid>  
    
    
                      <Dialog open={open} onClose={addInfClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Ajouter un infirmier</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={infFirstNameError[0]}
                                  helperText={infFirstNameError[1]}
                                  required
                                  margin="dense"
                                  name="inf_first_name"
                                  id="inf_first_name"
                                  label="Nom de l'infirmier"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setInfFirstName(event.target.value)}}
                                />
                                <TextField
                                  error={infLastNameError[0]}
                                  helperText={infLastNameError[1]}
                                  required
                                  margin="dense"
                                  id="inf_last_name"
                                  label="Prénom de l'infirmier"
                                  fullWidth
                                  variant="standard"
                                  onChange={(event) => {setInfLastName(event.target.value)}}
                                />                                                              
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={addInfClose}>Anuller</Button>
                                <Button onClick={addInfSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openUpdate} onClose={updateInfClose}  maxWidth="md" fullWidth={true}>
                          <DialogTitle>Modifier un infirmier</DialogTitle>
                              <DialogContent>
                                <TextField
                                  error={infFirstNameError[0]}
                                  helperText={infFirstNameError[1]}
                                  required
                                  margin="dense"
                                  name="inf_first_name"
                                  id="inf_first_name"
                                  label="Nom de l'infirmier"
                                  fullWidth
                                  variant="standard"
                                  value={infFirstName}
                                  onChange={(event) => {setInfFirstName(event.target.value)}}
                                />
                                <TextField
                                  error={infLastNameError[0]}
                                  helperText={infLastNameError[1]}
                                  required
                                  margin="dense"
                                  id="inf_last_name"
                                  label="Prénom de l'infirmier"
                                  fullWidth
                                  variant="standard"
                                  value={infLastName}
                                  onChange={(event) => {setInfLastName(event.target.value)}}
                                />                                
                                  
                              </DialogContent>
                              <DialogActions>
                              <Button onClick={updateInfClose}>Anuller</Button>
                                <Button onClick={updateInfSave}>Sauvgarder</Button>
                              </DialogActions>
                      </Dialog>
    
    
                      <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteInfClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un infirmier"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer l'infirmier ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteInfClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
                             
            </Container>
    
    
            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un infirmier' onClose={()=> setSelectionError(false)} /> : null}
          
            </React.Fragment>
    
    
        )







  }