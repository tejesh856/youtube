const navbtn=document.querySelector('.navbar');
const sidebar=document.querySelector('.side_bar');
const hr1=document.querySelector('.hr1');
        const hr2=document.querySelector('.hr2');
        const link2=document.querySelector('.link2');
        const link1=document.querySelector('.link1');
        const l1=document.querySelectorAll('.link1 li');
        const l2=document.querySelectorAll('.link2 li');
        const appbtn=document.querySelector('.apps');
        const apps=document.querySelector('.link_apps');
        const box=document.querySelectorAll('.box');
        const header=document.querySelector('.header');
        const videos=document.querySelector('.video_container');
        const appmenubtn=document.querySelector('#appbtn');
        const appmenu=document.querySelector('#menu');
        const settings=document.querySelector('.sharp');
        const settingsmenu=document.querySelector('.settings');


        navbtn.addEventListener('click',()=>{
            if (sidebar.className=='side_bar side') {
                sidebar.className="side_bar";
                
                hr1.style="display:none;";
                hr2.style="display:none;";
                link2.style="margin:0px 0px";
                link1.style="padding-bottom:0px";
                for (let i = 0; i < l1.length; i++){
                    var a1=l1[i].children;
                    a1[0].style="padding:25px 15px 25px 10px; flex-direction:column;";
                    var p1=a1[0].children;
                    p1[1].style="font-size: 10px; font-weight: normal; margin-left: 0px; margin-top:5px;";

                }
                for (let i = 0; i < l2.length; i++){
                    var a2=l2[i].children;
                    a2[0].style="padding:25px 15px 25px 10px; flex-direction:column;";
                    var p2=a2[0].children;
                    p2[1].style="font-size: 10px; font-weight: normal; margin-left:0px; margin-top:5px;";

                }
                videos.style="left:90px; width: calc(100% - 90px);";

            }
            else{
                sidebar.className="side_bar side";
                hr1.style="display:block;";
                hr2.style="display:block;";
                link2.style="margin:10px 0px";
                link1.style="padding-bottom:10px";
                videos.style="left:300px; width: calc(100% - 300px);";
                for (let i = 0; i < l1.length; i++){
                    var a1=l1[i].children;
                    a1[0].style="padding:15px 15px 15px 30px; flex-direction:row;";
                    var p1=a1[0].children;
                    if(i===0){
                        p1[1].style="margin-left:53px;";
                    }
                    else if(i===1){
                        p1[1].style="margin-left:55px;";
                    }
                    p1[1].style="font-size: 14px; font-weight: normal; margin-left: 50px; margin-top:0px;";

                }
                for (let i = 0; i < l2.length; i++){
                    var a2=l2[i].children;
                    a2[0].style="padding:15px 15px 15px 30px; flex-direction:row;";
                    var p2=a2[0].children;
                    p2[1].style="font-size: 14px; font-weight: normal; margin-left: 50px; margin-top:0px;";

                }
            }

        })

       
       
        
        appbtn.addEventListener('click',()=>{
            if (apps.className==="link_apps app" && appbtn.className==="apps appbg") {
                apps.classList.remove('app');
                appbtn.classList.remove('appbg');
                
            }
            else{
                apps.classList.add('app');
                appbtn.classList.add('appbg');
            }
            
            
        })

        document.addEventListener('click',(e)=>{
            if(e.target.id!="part" && e.target.id!="menu" && e.target.id!="boxes" && e.target.id!="a" && e.target.id!="p" && e.target.id!="img"){
                apps.classList.remove('app');
                appbtn.classList.remove('appbg');

            }
            if (e.target.id!="sets" && e.target.id!="sa" && e.target.id!="s") {
                settingsmenu.classList.remove('set');
            }
           

        })
        settings.addEventListener('click',()=>{
            if (settingsmenu.className==="settings") {
                settingsmenu.classList.add('set');
                
            }
            else{
                settingsmenu.classList.remove('set');
            }
            
        })
        
        let api_key="AIzaSyDqqot4iHgL9-XK5V9UI10brhz4Ub7uh-8";
        let video_http = "https://www.googleapis.com/youtube/v3/videos?";
        let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
        
        fetch(video_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 1000,
            regionCode: 'IN'
        }))
        .then(res => res.json())
        .then(data => {
            data.items.forEach(item => {
                getChannelIcon(item);
            })
        })
        .catch(err => console.log(err));
        const getChannelIcon = (video_data) => {
            fetch(channel_http + new URLSearchParams({
                key: api_key,
                part: 'snippet',
                id: video_data.snippet.channelId
            }))
            .then(res => res.json())
            .then(data => {
                video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
                makeVideoCard(video_data);
            })
        }

        const makeVideoCard = (data) => {
            videos.innerHTML += `
            <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
                <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
                <div class="content">
                    <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                    <div class="info">
                        <h4 class="titles">${data.snippet.title}</h4>
                        <p class="channel-name">${data.snippet.channelTitle}</p>
                    </div>
                </div>
            </div>
            `;
        }

        const searchInput = document.querySelector('#search_bar');
        const searchBtn = document.querySelector('.search_btn');
        let searchLink = "https://www.youtube.com/results?search_query=";
        searchBtn.addEventListener('click', () => {
            if(searchInput.value.length){
                location.href = searchLink + searchInput.value;
            }
        })
