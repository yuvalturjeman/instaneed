// import { useState } from 'react'
// import { DetailsFullGallery } from './details-full-gallery';

// export function DetailsGallery({ story }) {
//     const [showMore, setShowMore ] = useState(false)

//     function onOpenImgsModal(){
//         setShowMore(true)
//     }

//     function onCloseImgsModal() {
//         setShowMore(false)
//     }

//     return (

//         <div >
//             {story && 
//             <div className="details-gallery">

//                 <img src={story.imgUrls} alt="#" />
//                 <img src={story.imgUrls} alt="#" />
//                 <img src={story.imgUrls} alt="#" />
//                 <img src={story.imgUrls} alt="#" />
//                 <img src={story.imgUrls} alt="#" />
//                 <img src={story.imgUrls} alt="#" />
//                 {showMore && (
//                   <DetailsFullGallery story={story} onClose={onCloseImgsModal} />
//                 )}
//                   </div>
//       }
//       {!showMore && (
//         <button onClick={onOpenImgsModal}>Show more photos</button>
//       )}
//     </div>
//   );
// }