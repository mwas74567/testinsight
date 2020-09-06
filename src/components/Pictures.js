import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    image : {
        width: 80,
        height: 80,
        
    }


});

const Pictures = (props) => {
    const {attachments,classes } = props;
    const markup = attachments.map(imageUrl => {
        return(
           <img src ={imageUrl} alt="No Image" className ={classes.image}/>
        )

    })
    
    return (
        <>
        {markup} 
        </>
    )
}

export default (withStyles(styles))(React.memo(Pictures));

// import React from 'react'
// import withStyles from '@material-ui/core/styles/withStyles';
// import { ImageGroup,Image } from 'react-fullscreen-image'


// const styles = theme => ({
//     image : {
//         width: 80,
//         height: 80, 
        
//     }


// });

// const Pictures = (props) => {
//     const {attachments,classes } = props;
//     const markup = attachments.map(imageUrl => {
//         return (
//             <ImageGroup>
//               <ul className={classes.image}>
//                   <li key={imageUrl}>
//                     <Image
//                       src={imageUrl}
//                       alt="nature"
//                       style={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         height: '100%',
//                         width: '100%',
//                         objectFit: 'cover',
//                       }}
//                     />
//                   </li>
//                 )
//               </ul>
//             </ImageGroup>
//           )
//         return (
//                     <>
//                     {markup} 
//                     </>
//                 )

//     })


      
    
// }



// export default (withStyles(styles))(React.memo(Pictures));
