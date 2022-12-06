$(document).on("page:afterin", '.page[data-name="photos"]', function () {
    console.log("PHOTO PAGE");
    photos = app.store.getters.photos.value.reverse();

    photos.map((photo) => {
        let img = new Image();
        img.src = photo.url;
        console.log("LOOKING AT PHOTO:", photo.id);

        $("#photoGalleryContainer").append(
        `<div class="card">
            <div class="card-header">
                <h2>
                    <div style="display: inline;">Points: </div>
                    <div style="display: inline; color: var(--f7-theme-color);" class="outerglow-text">${Math.round(photo.score*1000)/1000}km</di>
                </h2>
            </div>
            <div class="card-content">
                <img src=${photo.url}>
            </div>
            <div class="card-footer">
                Location: ${Math.round(photo.location.lat * 10000)/10000}, ${Math.round(photo.location.lng * 10000)/10000} 
            </div>
        </div>`
        )
    });
});