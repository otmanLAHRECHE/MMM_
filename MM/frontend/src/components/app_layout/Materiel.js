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








  }