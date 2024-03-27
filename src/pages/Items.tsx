import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import APItable from '../components/APItable'
import FormDialog from '../components/FormDialog'
import { Item } from '../services/item/item.interface'
import { ItemService } from '../services/item/item.service'
import AuthContext from '../context/AuthContext'

export default function Items() {
  let { user, authTokens }: any = React.useContext(AuthContext)
  const [rows, setRows] = useState<Item[]>([])
  const [selected, setSelected] = useState<readonly number[]>([])
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteItem = async () => {
    try {
      const itemService = new ItemService()
      const output = await itemService.eliminarItem(selected[0], authTokens.access)
      setRows([...rows.splice(selected[0], 1)])
      console.log(rows)
    } catch (error) {
      console.log(error)
    }
  }

  const addItem = async (data: any) => {
    try {
      const itemService = new ItemService()
      const output = await itemService.crearItem(data, authTokens.access)
      setRows(oldRows => [...oldRows, output])
    } catch (error) {
      console.log(error)
    }
  }

  const getItem = async () => {
    try {
      const itemService = new ItemService()
      const output = await itemService.listarItemSegunUsuario(user.user_id, authTokens.access)
      setRows(output)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      height={1}
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
        // position: 'absolute'
      }}
    >
      <Box
        height={1}
        width={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
          // position: 'absolute'
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Your items
        </Typography>
        <FormDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} addItem={addItem} />
      </Box>
      <Box
        height={1}
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <APItable getItem={getItem} deleteItem={deleteItem} rows={rows} setRows={setRows} selected={selected} setSelected={setSelected} />
      </Box>
    </Box>
  )
}
