// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// import { Provider } from 'react-redux'
// import user from 'src/store/apps/user' // Assuming you've already created a Redux store named 'Store'
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

import AddUserDrawer from './AddUser'
import { Icon } from '@iconify/react'
import { Grid } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Link from 'next/link'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value, userType, userAdded } = props

  // const [addUserOpen, setAddUserOpen] = useState(false)
  // const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const handleAddUser = x => {
    if (x) {
      alert('Successfully User Added')
      userAdded
    } else {
    }
  }

  const { control, watch } = useForm()
  const ur = watch('userrole')

  useEffect(() => {
    console.log(control._formValues.userrole, ur)
    userType(control._formValues.userrole)
  }, [control, ur])

  // console.log('Boom --> ', control._formValues.userrole)

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid container spacing={6}>
        <Grid item sm={6} xs={12}>
          <Controller
            name='userrole'
            control={control}
            rules={{ required: true }}
            defaultValue={'student'}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                value={value}
                onChange={onChange}
                fullWidth
                id='userrole-select'
                label='Filter Role'
                sx={{ mb: 4 }}
                aria-describedby='validation-userrole-select'
                SelectProps={{
                  native: true // For Material-UI native Select
                }}
              >
                {/* <option value='null'>User Role</option> */}
                <option value='admin'>Admin</option>
                <option value='teacher'>Teacher</option>
                <option value='student'>Student</option>
              </CustomTextField>
            )}
          />
        </Grid>
        <Grid item sm={6} xs={12}>

        <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <CustomTextField
            value={value}
            sx={{ mr: 4 }}
            placeholder='Search User'
            onChange={e => handleFilter(e.target.value)}
            label='Search'
          />

          <AddUserDrawer toggle={handleAddUser} userTypeChoosed={ur} />

          <Button href={'/fileUpload'} component={Link} variant='contained' sx={{marginTop: '23px', marginLeft: "15px"}}>
            <a> Upload CSV </a>
          </Button>
        </Box>
      </Grid>
      </Grid>
    </Box>
  )
}

export default TableHeader
