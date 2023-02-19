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
import { addNewExemenTest, deleteExemenTest, getAllExemenTEst, getSelectedExemenTest, updateExemenTest } from '../../actions/exemen_test_data';


const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'exam_test', headerName: 'Teste', width: 180 },
    { field: 'exam_type', headerName: "Type d'examen", width: 180 },
    { field: 'exam_color', headerName: 'Couleur', width: 130 },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  export default function Test_types(){

    const [test, setTest] = React.useState("");
    const [testType, setTestType] = React.useState("");
    const [testColor, setTestColor] = React.useState("");

    const [testError, setTestError] = React.useState([false, ""]);
    const [testTypeError, setTestTypeError] = React.useState([false, ""]);
    const [testColorError, setTestColorError] = React.useState([false, ""]);


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


    const addTestOpen = () =>{
      setOpen(true);

      setTest("");
      setTestType("");
      setTestColor("")

      setTestError([false, ""]);
      setTestTypeError([false, ""]);
      setTestColorError([false, ""]);

    }

    const editTestOpen = async () =>{
     
      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{    
        const token = localStorage.getItem("auth_token");

        setRowData(await getSelectedExemenTest(token, selectionModel[0])); 
      }

    }

    const addTestClose = () =>{

      setOpen(false);

    }

    const updateTestClose = () =>{
      setOpenUpdate(false);

    }

    const deleteTestOpen = () =>{
      if(selectionModel.length == 0){
        setSelectionError(true);
      }else{   
        setOpenDelete(true);
      }

    }

    const deleteTestClose = () =>{
      setOpenDelete(false);

    }

    const addTestSave = async () =>{

      var test2 = true;

      setTestError([false, ""]);
      setTestTypeError([false, ""]);
      setTestColorError([false, ""]);


      if (test == ""){
        setTestError([true,"Ce champ est obligatoire"])
        test2 = false;
      }
      if (testType == ""){
        setTestTypeError([true,"Ce champ est obligatoire"])
        test2 = false;
      }
      
      if (testColor == ""){
        setTestColorError([true,"Ce champ est obligatoire"])
        test2 = false;
      }

      if (test2){
        setOpen(false);

        const data = {
          exam_test:test,
          exam_type:testType,
          exam_color:testColor,
        }  

        const token = localStorage.getItem("auth_token");

        setResponse(await addNewExemenTest(token, JSON.stringify(data))); 
        
      }
      else{
        setLoadError(true);
        console.log("error");

      }

    }

    const updateTestSave = async () =>{

      var test2 = true;

      setTestError([false, ""]);
      setTestTypeError([false, ""]);
      setTestColorError([false, ""]);



      if (test == ""){
        setTestError([true,"Ce champ est obligatoire"])
        test2 = false;
      }
      if (testType == ""){
        setTestTypeError([true,"Ce champ est obligatoire"])
        test2 = false;
      }
      
      if (testColor == ""){
        setTestColorError([true,"Ce champ est obligatoire"])
        test2 = false;
      }

      if (test2){
        setOpen(false);

        const data = {
          exam_test:test,
          exam_type:testType,
          exam_color:testColor,
        }  
        const token = localStorage.getItem("auth_token");

        setResponse(await updateExemenTest(token, JSON.stringify(data), rowData.id)); 

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
      setResponse(await deleteExemenTest(token, selectionModel[0])); 
        
    }


    React.useEffect(() => {

      try{

        if (rowData == "no data"){
          setResponseErrorSignal(true);
        } else if(rowData != "") {
  
        setOpenUpdate(true);
        console.log(rowData.id)
  
        setTest(rowData.exam_test);
        setTestType(rowData.exam_type);
        setTestColor(rowData.exam_color);

        setTestError([false, ""]);
        setTestTypeError([false, ""]);
        setTestColorError([false, ""]);

        if(rowData.exam_color == "default"){
          setTypeValue(1);
        }else if(rowData.exam_color == "primary"){
          setTypeValue(2);
        }else if(rowData.exam_color == "secondary"){
          setTypeValue(3);
        }else if(rowData.exam_color == "error"){
          setTypeValue(4);
        }else if(rowData.exam_color == "info"){
          setTypeValue(5);
        }else if(rowData.exam_color == "success"){
          setTypeValue(6);
        }else if(rowData.exam_color == "warning"){
          setTypeValue(7);
        }

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
            setData(await getAllExemenTEst(token));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
  
      }, [response]);


      const change_type = (event) => {
        if (event.target.value == ""){
          setTestColor("")
        }else if (event.target.value == 1){
          setTestColor("default")
        }else if (event.target.value == 2){
          setTestColor("primary")
        }else if (event.target.value == 3){
          setTestColor("secondary")
        }else if (event.target.value == 4){
          setTestColor("error")
        }else if (event.target.value == 5){
          setTestColor("info")
        }else if (event.target.value == 6){
          setTestColor("success")
        }else if (event.target.value == 7){
          setTestColor("warning")
        }
    };



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
                              Manager les Testes
                            </ListSubheader>
                          }
                        >
                          <ListItemButton onClick={addTestOpen}>
                            <ListItemIcon>
                              <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ajoute un teste" />
                          </ListItemButton>
                          <ListItemButton onClick={editTestOpen}>
                            <ListItemIcon>
                              <EditIcon />
                            </ListItemIcon>
                            <ListItemText primary="Modifier un teste" />
                          </ListItemButton>
                          <ListItemButton onClick={deleteTestOpen}>
                            <ListItemIcon>
                              <DeleteForeverIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supprime un teste" />
                          </ListItemButton>
                        </List>

                  </Grid>
                </Grid>  


                  <Dialog open={open} onClose={addTestClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>Ajouter un teste</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={testError[0]}
                              helperText={testError[1]}
                              required
                              margin="dense"
                              name="test_exam"
                              id="test_exam"
                              label="Nom de teste"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setTest(event.target.value)}}
                            />
                            <TextField
                              error={testTypeError[0]}
                              helperText={testTypeError[1]}
                              required
                              margin="dense"
                              id="test_type"
                              label="Type de teste"
                              fullWidth
                              variant="standard"
                              onChange={(event) => {setTestType(event.target.value)}}
                            /> 

                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={testColorError[0]}
                                  helperText={testColorError[1]}>Couleur de teste</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="Type de médicament"
                                    onChange={change_type}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={1}>default</MenuItem>
                                      <MenuItem value={2}>primary</MenuItem>
                                      <MenuItem value={3}>secondary</MenuItem>
                                      <MenuItem value={4}>error</MenuItem>
                                      <MenuItem value={5}>info</MenuItem>
                                      <MenuItem value={6}>success</MenuItem>
                                      <MenuItem value={7}>warning</MenuItem>
                                     

                                    </Select>
                                </FormControl>                                                             
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={addTestClose}>Anuller</Button>
                            <Button onClick={addTestSave}>Sauvgarder</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openUpdate} onClose={updateTestClose}  maxWidth="md" fullWidth={true}>
                      <DialogTitle>Modifier un Teste</DialogTitle>
                          <DialogContent>
                            <TextField
                              error={testError[0]}
                              helperText={testError[1]}
                              required
                              margin="dense"
                              name="test_exam"
                              id="test_exam"
                              label="Nom de teste"
                              fullWidth
                              variant="standard"
                              value={test}
                              onChange={(event) => {setTest(event.target.value)}}
                            />
                            <TextField
                              error={testTypeError[0]}
                              helperText={testTypeError[1]}
                              required
                              margin="dense"
                              id="test_type"
                              label="Type de teste"
                              fullWidth
                              variant="standard"
                              value={testType}
                              onChange={(event) => {setTestType(event.target.value)}}
                            />  

                            <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={testColorError[0]}
                                  helperText={testColorError[1]}>Couleur de teste</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="Type de médicament"
                                    onChange={change_type}
                                    value={typeValue}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={1}>default</MenuItem>
                                      <MenuItem value={2}>primary</MenuItem>
                                      <MenuItem value={3}>secondary</MenuItem>
                                      <MenuItem value={4}>error</MenuItem>
                                      <MenuItem value={5}>info</MenuItem>
                                      <MenuItem value={6}>success</MenuItem>
                                      <MenuItem value={7}>warning</MenuItem>
                                     

                                    </Select>
                                </FormControl>                              
                              
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={updateTestClose}>Anuller</Button>
                            <Button onClick={updateTestSave}>Sauvgarder</Button>
                          </DialogActions>
                  </Dialog>


                  <Dialog open={openDelete}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={deleteTestClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la suppression d'un type teste"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  Êtes-vous sûr de la décision de supprimer le teste?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={deleteTestClose}>Anuller</Button>
                                  <Button onClick={deleteConfirmation}>Supprimer</Button>
                                </DialogActions>
                  </Dialog>
                         
        </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {selectionError ? <Alt type='error' message='Selectioner un teste' onClose={()=> setSelectionError(false)} /> : null}
      
        </React.Fragment>


    )




  }
