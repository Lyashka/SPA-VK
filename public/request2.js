          
        
          const dataFriends = JSON.parse(localStorage.getItem('data'))
          console.log(dataFriends);
          
          for(let i = 0 ; i < dataFriends.length; i++){
            let script2 = document.createElement('SCRIPT');
            script2.src = "https://api.vk.com/method/friends.getMutual?source_uid=213743757&target_uid="+ dataFriends[i].id +"&v=5.131&access_token=vk1.a.t2EOxeJ2lqa8Rfy7LSwWYVOLxvuOmGaTR6Le0lNdH3ajdaoVLvegxj21KFYyKnAD5YQgrN7o_lufWRF0v9dAvJ9DXRlsTrJWEUXuzBT7dJocy4GeNBGcRDwoz8yr9Z2wZQc1esHJUZAgnJpKgueP_1swMdirJfqabbloW9jGjbXsxBpSbz5RsDryDyRyj7Di&callback=callbackFuncf";
            document.getElementsByTagName("head")[0].appendChild(script2);
            function callbackFuncf(result) {
            let data2 = localStorage.setItem('data2', JSON.stringify(result.response)) 
            console.log(result.response);
            }
          }
         