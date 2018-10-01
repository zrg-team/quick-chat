import red from '@material-ui/core/colors/red'
const styles = {
  container: {
    alignItems: 'center',
    background: 'white',
    borderRadius: '3px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    margin: '0px auto',
    overflow: 'hidden',
    width: '300px'
  },
  fab: {
    backgroundColor: '#EA4335',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: '18px',
    fontWeight: '300',
    height: '50px',
    transform: 'translateY(-25px)',
    width: '50px'
  },
  content: {
    padding: '50px 20px',
    transform: 'translateY(-25px)',
    width: '100%'
  },
  content_text: {
    fontSize: '16px',
    lineHeight: '1.6em'
  },
  profile_picture: {
    borderRadius: '50%',
    height: '100px',
    overflow: 'hidden',
    width: '100px'
  },
  profile_picture_full: {
    pointerEvents: 'none'
  },
  info: {
    marginTop: '10px'
  },
  info_type: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '1.6em'
  },
  info_data: {
    color: 'grey',
    float: 'right',
    fontSize: '16px',
    lineHeight: '1.6em'
  },
  social_media: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px'
  },
  social_media_links: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    justifyContent: 'center',
    marginTop: '5px',
    width: '100%'
  },
  social_media_btn: {
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    fontSize: '20px',
    height: '40px',
    textShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    width: '40px'
  },
  icon: {
    margin: '0 auto'
  },
  iconHover: {
    margin: '0 auto',
    '&:hover': {
      color: red[800]
    }
  },
  change_info: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    height: '40px',
    width: '40px'
  }
}
export default styles
