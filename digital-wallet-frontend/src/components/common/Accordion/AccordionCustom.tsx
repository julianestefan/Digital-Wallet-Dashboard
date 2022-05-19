import React from 'react'

import {AccordionSummary, AccordionDetails, Typography} from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion } from '@mui/material';

interface Props {
  children?: any;
  text?: string;
  width?: string;
  expanded?: boolean;
  onClick?: void | any;
}

const AccordionCustom = ({
  width = 'fit-content',
  text = 'Titulo',
  children = 'Contenido',
  expanded = false,
  onClick = () => { }
}: Props) => {


  return (
    <div style={{ width: width, margin:'10px 0' }}>
      <Accordion expanded={expanded} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={onClick}
        >
          <Typography>{text}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default AccordionCustom