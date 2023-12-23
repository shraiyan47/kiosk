// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomCheckboxIcons = props => {
  // ** Props
  const { data, icon, name, selected, gridProps, iconProps, handleChange, color = 'primary' } = props
  // const { title, value, content } = data
  const { SectionOption, Id, content } = data

  const renderComponent = () => {
    return (
      <Grid item {...gridProps}>
        <Box
          onClick={() => handleChange(Id)}
          sx={{
            p: 4,
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            border: theme => `1px solid ${theme.palette.divider}`,
            ...(selected.includes(Id)
              ? {
                  borderColor: `${color}.main`,
                  backgroundColor: '#fff4f4',
                  '& svg': { color: theme => `${theme.palette.primary.main} !important` }
                }
              : { '&:hover': { borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)` } })
          }}
        >
          {icon ? <Icon icon={icon} {...iconProps} /> : null}
          {SectionOption ? (
            typeof SectionOption === 'string' ? (
              <Typography variant='h5' sx={{ ...(content ? { mb: 2 } : { my: 'auto' }), textAlign: 'center', margin: '20px 5px' }}>
                {SectionOption}
              </Typography>
            ) : (
              SectionOption
            )
          ) : null}
          {content ? (
            typeof content === 'string' ? (
              <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
                {content}
              </Typography>
            ) : (
              content
            )
          ) : null}
          <Checkbox
            size='small'
            color={color}
            name={`${name}-${Id}`}
            checked={selected.includes(Id)}
            onChange={() => handleChange(Id)}
            sx={{ mb: -2, ...(!icon && !SectionOption && !content && { mt: -2 }) }}
          />
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

export default CustomCheckboxIcons
