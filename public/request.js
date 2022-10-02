let script = document.createElement('SCRIPT');
script.src = "https://api.vk.com/method/friends.search?count=15&fields=photo_50&v=5.131&access_token=vk1.a.t2EOxeJ2lqa8Rfy7LSwWYVOLxvuOmGaTR6Le0lNdH3ajdaoVLvegxj21KFYyKnAD5YQgrN7o_lufWRF0v9dAvJ9DXRlsTrJWEUXuzBT7dJocy4GeNBGcRDwoz8yr9Z2wZQc1esHJUZAgnJpKgueP_1swMdirJfqabbloW9jGjbXsxBpSbz5RsDryDyRyj7Di&callback=callbackFunc";
document.getElementsByTagName("head")[0].appendChild(script);
function callbackFunc(result) {
const data = localStorage.setItem('data', JSON.stringify(result.response.items))
}