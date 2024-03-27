import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Outlet } from "react-router-dom"
import Appbar from './Appbar'

export default function Base() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Appbar />
      <Container
        maxWidth="xl"
        sx={{
          my: 4,
          flexGrow: 1,
          // position: 'relative'
        }}
      >
        <Outlet />
      </Container>
    </Box>
  )
}
