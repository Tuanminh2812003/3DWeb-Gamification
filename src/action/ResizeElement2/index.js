import { useEffect } from 'react';
import throttle from 'lodash.throttle';

const ResizeHandler = ({ updateItemsForScreenSize, level }) => {
    useEffect(() => {
        const handleResize = throttle(() => {
            const width = window.innerWidth;
            let newItems = [];

            if (level === "HaNoi") {
                newItems = [
                    {
                        id: 1,
                        position: [-7.08311, 1.09641, 5.50483],
                        rotation: [0, 90, 0],
                        scale: 1,
                        imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                        modelUrl: "/Farm/hoang_thanh.glb",
                        info: { artist: 'Hoàng Thành Thăng Long', title: '', year: `` },
                        type: 'model',
                        video: "",
                        imageInfo: "/Farm/ImageInfo/Hanh-6-LTS-edit.jpg",
                        hotspots: [
                            {
                              id: 'head1',
                              position: [0, 1, 1.1],
                              title: 'Đầu',
                              description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                            },
                            {
                              id: 'head2',
                              position: [0, -0.7, -1.2],
                              title: 'Mắt',
                              description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                            },
                            {
                                id: 'head3',
                                position: [0, -0.8, -2],
                                title: 'Mắt',
                                description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                              }
                        ]
                        
                    },
                    {
                      id: 2,
                      position: [7, 1.1057, 5.54576],
                      rotation: [0, -90, 0],
                      scale: 1,
                      imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                      modelUrl: "/Farm/coloa.glb",
                      info: { artist: 'Cổ Loa', title: '', year: `` },
                      type: 'model',
                      video: "",
                      imageInfo: "/Farm/ImageInfo/coloa.png",
                      hotspots: [
                          {
                            id: 'head1',
                            position: [0, 1, 1.1],
                            title: 'Đầu',
                            description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                          },
                          {
                            id: 'head2',
                            position: [0, -0.7, -1.2],
                            title: 'Mắt',
                            description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                          },
                          {
                              id: 'head3',
                              position: [0, -0.8, -2],
                              title: 'Mắt',
                              description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                            }
                      ]
                      
                  },
                ];
            } else if(level === "PhuTho"){
              newItems = [
                {
                    id: 1,
                    position: [-7.08311, 1.09641, 5.50483],
                    rotation: [0, 90, 0],
                    scale: 1,
                    imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                    modelUrl: "/Farm/denhung.glb",
                    info: { artist: 'Đền Hùng', title: '', year: `` },
                    type: 'model',
                    video: "",
                    imageInfo: "/Farm/ImageInfo/denhung.png",
                    hotspots: [
                        {
                          id: 'head1',
                          position: [0, 1, 1.1],
                          title: 'Đầu',
                          description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                        },
                        {
                          id: 'head2',
                          position: [0, -0.7, -1.2],
                          title: 'Mắt',
                          description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                        },
                        {
                            id: 'head3',
                            position: [0, -0.8, -2],
                            title: 'Mắt',
                            description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                          }
                    ]
                    
                },
                {
                  id: 2,
                  position: [7, 1.1057, 5.54576],
                  rotation: [0, -90, 0],
                  scale: 1,
                  imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                  modelUrl: "/Farm/hatxoan.glb",
                  info: { artist: 'Hát Xoan', title: '', year: `` },
                  type: 'model',
                  video: "",
                  imageInfo: "/Farm/ImageInfo/hatxoan.png",
                  hotspots: [
                      {
                        id: 'head1',
                        position: [0, 1, 1.1],
                        title: 'Đầu',
                        description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                      },
                      {
                        id: 'head2',
                        position: [0, -0.7, -1.2],
                        title: 'Mắt',
                        description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                      },
                      {
                          id: 'head3',
                          position: [0, -0.8, -2],
                          title: 'Mắt',
                          description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                        }
                  ]
                  
              },
            ];
            } else if(level === "NinhBinh"){

              newItems = [
                {
                    id: 1,
                    position: [-7.08311, 1.09641, 5.50483],
                    rotation: [0, 90, 0],
                    scale: 1,
                    imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                    modelUrl: "/Farm/hoalu.glb",
                    info: { artist: 'Di tích lịch sử và kiến trúc nghệ thuật Cố đô Hoa Lư', title: '', year: `` },
                    type: 'model',
                    video: "",
                    imageInfo: "/Farm/ImageInfo/codohoalu.png",
                    hotspots: [
                        {
                          id: 'head1',
                          position: [0, 1, 1.1],
                          title: 'Đầu',
                          description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                        },
                        {
                          id: 'head2',
                          position: [0, -0.7, -1.2],
                          title: 'Mắt',
                          description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                        },
                        {
                            id: 'head3',
                            position: [0, -0.8, -2],
                            title: 'Mắt',
                            description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                          }
                    ]
                    
                },
                {
                  id: 2,
                  position: [7, 1.1057, 5.54576],
                  rotation: [0, -90, 0],
                  scale: 1,
                  imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                  modelUrl: "/Farm/trangan.glb",
                  info: { artist: 'Quần thể danh thắng Tràng An', title: '', year: `` },
                  type: 'model',
                  video: "",
                  imageInfo: "/Farm/ImageInfo/trangan.png",
                  hotspots: [
                      {
                        id: 'head1',
                        position: [0, 1, 1.1],
                        title: 'Đầu',
                        description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                      },
                      {
                        id: 'head2',
                        position: [0, -0.7, -1.2],
                        title: 'Mắt',
                        description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                      },
                      {
                          id: 'head3',
                          position: [0, -0.8, -2],
                          title: 'Mắt',
                          description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                        }
                  ]
                  
              },
            ];
            } else if(level === "ThanhHoa"){
              newItems = [
                {
                    id: 1,
                    position: [-7.08311, 1.09641, 5.50483],
                    rotation: [0, 90, 0],
                    scale: 1,
                    imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                    modelUrl: "/Farm/thanhnhaHo.glb",
                    info: { artist: 'Di tích Thành Nhà Hồ', title: '', year: `` },
                    type: 'model',
                    video: "",
                    imageInfo: "/Farm/ImageInfo/thanhnhaho.png",
                    hotspots: [
                        {
                          id: 'head1',
                          position: [0, 1, 1.1],
                          title: 'Đầu',
                          description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                        },
                        {
                          id: 'head2',
                          position: [0, -0.7, -1.2],
                          title: 'Mắt',
                          description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                        },
                        {
                            id: 'head3',
                            position: [0, -0.8, -2],
                            title: 'Mắt',
                            description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                          }
                    ]
                    
                },
                {
                  id: 2,
                  position: [7, 1.1057, 5.54576],
                  rotation: [0, -90, 0],
                  scale: 1,
                  imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                  modelUrl: "/Farm/LamKinh.glb",
                  info: { artist: 'Di tích lịch sử và kiến trúc nghệ thuật Lam Kinh', title: '', year: `` },
                  type: 'model',
                  video: "",
                  imageInfo: "/Farm/ImageInfo/lamkinh.png",
                  hotspots: [
                      {
                        id: 'head1',
                        position: [0, 1, 1.1],
                        title: 'Đầu',
                        description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                      },
                      {
                        id: 'head2',
                        position: [0, -0.7, -1.2],
                        title: 'Mắt',
                        description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                      },
                      {
                          id: 'head3',
                          position: [0, -0.8, -2],
                          title: 'Mắt',
                          description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                        }
                  ]
                  
              },
            ];
            }else if(level === "Hue"){
              newItems = [
                {
                    id: 1,
                    position: [-7.08311, 1.09641, 5.50483],
                    rotation: [0, 90, 0],
                    scale: 1,
                    imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                    modelUrl: "/Farm/codoHue.glb",
                    info: { artist: 'Quần thể di tích Cố đô Huế', title: '', year: `` },
                    type: 'model',
                    video: "",
                    imageInfo: "/Farm/ImageInfo/codohue.png",
                    hotspots: [
                        {
                          id: 'head1',
                          position: [0, 1, 1.1],
                          title: 'Đầu',
                          description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                        },
                        {
                          id: 'head2',
                          position: [0, -0.7, -1.2],
                          title: 'Mắt',
                          description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                        },
                        {
                            id: 'head3',
                            position: [0, -0.8, -2],
                            title: 'Mắt',
                            description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                          }
                    ]
                    
                },
                {
                  id: 2,
                  position: [7, 1.1057, 5.54576],
                  rotation: [0, -90, 0],
                  scale: 1,
                  imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                  modelUrl: "/Farm/nhanhacHue.glb",
                  info: { artist: 'Nhã nhạc cung đình Huế', title: '', year: `` },
                  type: 'model',
                  video: "",
                  imageInfo: "/Farm/ImageInfo/nhanhac.png",
                  hotspots: [
                      {
                        id: 'head1',
                        position: [0, 1, 1.1],
                        title: 'Đầu',
                        description: '<img src="/Farm/Image/bonus/bonus1_1.png"/>',
                      },
                      {
                        id: 'head2',
                        position: [0, -0.7, -1.2],
                        title: 'Mắt',
                        description: '<img src="/Farm/Image/bonus/bonus1_2.png"/>',
                      },
                      {
                          id: 'head3',
                          position: [0, -0.8, -2],
                          title: 'Mắt',
                          description: '<iframe style={{margin:"12px"}} width="100%" height="500px" src="https://www.youtube.com/embed/4RwogJ5bHaA?si=u3h5jLu5x0zVgjeC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                        }
                  ]
                  
              },
            ];
            }

            // Check if newItems is different from current items
            updateItemsForScreenSize((prevItems) => {
                if (JSON.stringify(prevItems) !== JSON.stringify(newItems)) {
                    return newItems;
                }
                return prevItems;
            });
        }, 200); // Throttle resize events to every 200ms

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to handleResize to set initial items

        return () => window.removeEventListener('resize', handleResize);
    }, [updateItemsForScreenSize]);

    return null;
};

export default ResizeHandler;
