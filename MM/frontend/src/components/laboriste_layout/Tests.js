import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import dayjs from 'dayjs';


import PropTypes from 'prop-types';
import { useGridApiContext } from '@mui/x-data-grid';

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

import Alt from '../layouts/alert';

import { internal_processStyles } from '@mui/styled-engine';
import ExamenItemsList from './Items-test-list';



import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SummarizeIcon from '@mui/icons-material/Summarize';

import InputLabel from '@mui/material/InputLabel';
import { getAllInfirmierForSelect } from '../../actions/inf_prelevement_data';
import { getAllTestesTypesForSelect, getLastExemenTest, getTestDetailsForSelectedExam, getTestesForSelectedType } from '../../actions/exemen_test_data';
import { addNewExemen, deleteExemen, addNewTest, getSelectedExemen, updateExemen, deleteTestOfExamen, getAllExamenOfMonthForLabo } from '../../actions/examen_data';
import ReadyStatus from './ready_status';
import { getAllLaboristeForSelect } from '../../actions/laboriste_data';


function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option></option>
      <option>Positiv +</option>
      <option>Negativ -</option>
    </Select>
  );
}

SelectEditInputCell.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

const columnsTest = [
  {
    field: 'test',
    headerName: 'Test',
    width: 120,
    valueGetter: (params) =>
  `${params.row.examen_test.exam_test}` 
  },
  {
    field: 'resultat_test',
    headerName: 'Resultat',
    renderEditCell: renderSelectEditInputCell,
    editable: true,
    width: 180,
  },
];



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


let arr = [];

const columns = [
  { field: 'id', headerName: 'Id', width: 60, hide: true },
  { field: 'no_enregistrement', headerName: "No D'ENR", width: 80},
  { field: 'patient_first_name', headerName: "NOM", width: 100},
  { field: 'patient_last_name', headerName: "PRENOM", width: 100},
  { field: 'patient_birth_day', headerName: "DATE Ns", width: 100},
  { field: 'patient_genre', headerName: "GENRE", width: 80},
  { field: 'date_prelevement', headerName: "DATE DE PRELEVEMENT", width: 160 },
  { field: 'inf_prelevement', headerName: "INF DE PRELEVEMENT", width: 160, valueGetter: (params) =>
  `${params.row.inf_prelevement.first_name || ''} ${params.row.inf_prelevement.last_name || ''}` },
  { field: 'exm_type', headerName: "TYPE D'EXAMEN", width: 140 },
  { field: 'tes_exm', headerName: "LES TESTES D'EXAMEN", width: 250 , renderCell: (params) => (
    <ExamenItemsList testes={params.row.test_details}/>
  ),
 },
];





  export default function Tests(){

    

    const [laboriste, setLaboriste] = React.useState(null);
    const [dateResult, setDateResult] = React.useState("");
    const [resultNote, setResultNote] = React.useState(null);

    const [dateNaissance, setDateNaissance] = React.useState("");

    const [dateFilter, setDateFilter] = React.useState(dayjs());

    const [callBack, setCallBack] = React.useState("");

    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    

    const [laboristeError, setLaboristeError] = React.useState([false, ""]);
    const [dateResultError, setDateResultError] = React.useState([false, ""]);
    const [resultNoteError, setResultNoteError] = React.useState([false, ""]);
    const [dateNaissanceError, setDateNaissanceError] = React.useState([false, ""]);
    const [dateFilterError, setDateFilterError] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [sortieQntError, setSortieQntError] = React.useState(false);
    const [testTableError, setTestTableError] = React.useState(false);

    const [allLaboriste, setAllLaboriste] = React.useState([]);

    const [currentStockItem, setCurrentStockItem] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [laboristeData, setLaboristeData] = React.useState([]);
    const [trData, setTrData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [selectionModelItems, setSelectionModelItems] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loadingSortieItem, setLoadingSortieItem] = React.useState(false);

    const [dataError, setDataError] = React.useState(false);


    const theme = useTheme

    

      function Copyright(props) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/otmanLAHRECHE">
                Labo_SysApp EPSP_labo V1.0 
              </Link>{' '}
              -- created by otman LAHRECHE
              {'.'}
            </Typography>
          );
        }


        const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);
        }

        const handleChangeResultDate = (newValue) =>{
          setDateResult(newValue);

        }

        

        const addResultOpen = async() =>{
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{  

            arr= [];
          
          setLaboriste(null);
          setDateResult("");
          setResultNote("");

          setLaboristeError([false, ""]);
          setDateResultError([false, ""]);
          setResultNoteError([false, ""]);

            const token = localStorage.getItem("auth_token");

            setLaboristeData(await getAllLaboristeForSelect(token));

            setTrData(await getTestDetailsForSelectedExam(token, selectionModel[0]));

            
          }
          
        }

        const addResultatClose = () =>{
          setOpenUpdate(false);
        }

        const addResultatSave = async() =>{
          
          var test = true;

          setLaboristeError([false, ""]);
          setDateResultError([false, ""]);

          if(laboriste == null || laboriste == ""){
            test = false;
            setLaboristeError([true, "champ est obligatoire"])
          }
          if(dateResult == null || dateResult == ""){
            test = false;
            setDateResultError([true, "champ est obligatoire"]);
          }else if(dateResult.isValid() == false){
            test = false;
            setDateResultError([true, "date n'est pas valide"]);
          }
          
          for(let i=0; i<arr.length; i++){
            if(arr[i].resultat_test == ''){
              test = false;
              setTestTableError(true);
            }
          }


          if (test){
            console.log("lets gooo")

            
          }
          
        }


        const deleteExamenOpen = () =>{
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{   
            setOpenDelete(true);
          }
        }

        const deleteExamenClose = () =>{
          setOpenDelete(false)

        }

        const deleteConfirmation = async() =>{
          setOpenDelete(false);
          const token = localStorage.getItem("auth_token");
          setResponse(await deleteExemen(token, selectionModel[0]));

        }


        const processRowUpdate  = async(newRow) =>{
            for (let i=0; i<arr.length; i++){ 
              if(newRow == arr[i]){
                console.log("equal..................");
              }else{
                
                  if(newRow.id == arr[i].id){   
                    arr[i].resultat_test = newRow.resultat_test;            
                }
              } 
            };
            
        };
      

      React.useEffect(() => {
  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);

      React.useEffect(() => {

        setLoading(true);
        setDateFilterError([false, ""]);

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var month = dateFilter.get("month")+1
            var year = dateFilter.get('year')
            setData(await getAllExamenOfMonthForLabo(token, month, year));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };

        if (dateFilter.isValid() == false || dateFilter ==""){
          setDateFilterError([true, "une erreur sur le champ de date"]);
          setDateFilterNotErr(true);
        }else{
          fetchData();
        }

        setOpen(false);
      }, [response, dateFilter]);



      React.useEffect(() =>{
        try{
          if (laboristeData == "no data"){
            setResponseErrorSignal(true);
          } else if(laboristeData != "") {
            setAllLaboriste(laboristeData);
            setOpenUpdate(true);
          }
        }catch(e){
          console.log(e);
        }
      }, [laboristeData]);


      React.useEffect(() =>{
        try{
          if (trData == "no data"){
            setResponseErrorSignal(true);
          } else if(trData != "") {
            arr = trData;
          }
        }catch(e){
          console.log(e);
        }
      }, [trData]);



        return(

          <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>

              <Grid item xs={6}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        views={['year', 'month']}
                                                        label="Selectioner le mois"
                                                        value={dateFilter}
                                                        onChange={handleChangeFilterDate}
                                                        renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                        helperText={dateFilterError[1]} 
                                                        required/>}
                                                />

              </LocalizationProvider>

              </Paper>
                
              </Grid>

              <Grid item xs={6}>

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
                <ButtonGroup variant="outlined" aria-label="outlined primary button group" orientation="vertical">
                  <Button startIcon={<SummarizeIcon />} onClick={addResultOpen}>Ajouter un résultat</Button>
                  <Button startIcon={<DeleteForeverIcon />} onClick={deleteExamenOpen}>Supprimer un examen</Button>
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
                              getRowHeight={() => 'auto'}
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


            <Dialog open={openUpdate} onClose={addResultatClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Resultat</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                        <Autocomplete
                                                    disablePortal
                                                    value={laboriste}
                                                    onChange={(event, newVlue) =>{
                                                        setLaboriste(newVlue);
                                                        
                                                    }}
                                                    options={allLaboriste}
                                                    renderInput={(params) => <TextField {...params} error={laboristeError[0]}
                                                    helperText={laboristeError[1]} fullWidth label="laborantin" 
                                                    required/>}
                                                />  
                                        
                                        </Grid>
                                        <Grid item xs={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="Date de resultat"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={dateResult}
                                                        onChange={handleChangeResultDate}
                                                        renderInput={(params) => <TextField {...params} fullWidth error={dateResultError[0]}
                                                        helperText={dateResultError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                        
                                        </Grid>

                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <TextField
                                        error={resultNoteError[0]}
                                        helperText={resultNoteError[1]}
                                        id="outlined-textarea"
                                        label="Note"
                                        multiline
                                        onChange={(event) => {setResultNote(event.target.value)}}                                          
                                      />

                                        </Grid>
                                        <Grid item xs={8}>
                                        <div style={{ height: 300, width: '100%' }}>
                                          <DataGrid
                                            rows={trData}
                                            columns={columnsTest}
                                            processRowUpdate ={processRowUpdate}
                                            experimentalFeatures={{ newEditingApi: true }}
                                          />
                                        </div>
                                        
                                        </Grid>
                        
                      </Grid>

                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addResultatClose}>Anuller</Button>
                                <Button onClick={addResultatSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>

            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteExamenClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un examen"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer l'examen ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteExamenClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>
            
          </Container>


            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
            {sortieQntError ? <Alt type='error' message='la quantité remplie n est pas desponible' onClose={()=> setSortieQntError(false)} /> : null}
            {dataError ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDataError(false)} /> : null}
            {dateFilterNotErr ? <Alt type='error' message='La liste des items de bon de sorte est vide!!' onClose={()=> setDateFilterNotErr(false)} /> : null}
            {testTableError ? <Alt type='error' message='Des erruers sur les resultat des testes!!' onClose={()=> setTestTableError(false)} /> : null}
          
        </React.Fragment>



        );
  }


  