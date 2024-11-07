document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('kt_calendar_app');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: "title",
            center: "",
            right: "dayGridMonth,timeGridDay",
        },
        footerToolbar: {
            left: "",
            center: "",
            right: "prev,next",
        },
        initialView: 'dayGridMonth',
        locale: selectedLanguage,  //layout'dan gelen dil verisine göre takvimin dilini deðiþtiriyoruz. selectedLanguage deðiþkeni admin layout'da tanýmlanmýþtýr!!!
        dayMaxEvents: true,
        eventMouseEnter: function (event) {
            eventDataTemplate.startDate = event.event.start;
            eventDataTemplate.endDate = event.event.end;
            eventDataTemplate.eventName = event.event.title;
            showPopover(event.el);
        },
        eventMouseLeave: function (info) {
            hidePopover();
        },
        eventClick: function (event) {
            window.location.href = '/admin/exam/details?id=' + event.event.id;
            hidePopover();
            showModal();
        },
        datesSet: function (info) {
            var cdate = calendar.getDate();
            var month = cdate.getMonth() + 1;
            var year = cdate.getFullYear();
            var url = '/Admin/Home/GetEvents?year=' + year + '&month=' + month;

            document.getElementById('loading-overlay').classList.remove('d-none');
            calendarEl.style.filter = 'blur(3px)';
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(events => {
                    calendar.removeAllEvents();
                    calendar.addEventSource(events);
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                }).finally(() => {
                    document.getElementById('loading-overlay').classList.add('d-none');
                    calendarEl.style.filter = 'blur(0px)';
                });
        },
    });

    var card = document.querySelector('#kt_calendar .card');
    var cardHeader = card.querySelector('.card-header');
    var cardBody = card.querySelector('.card-body');

    cardBody.style.display = 'block';
    calendar.render();

    cardHeader.style.cursor = 'pointer';
    cardHeader.addEventListener('click', function () {
        if (cardBody.style.display === 'none') {
            cardBody.style.display = 'block';
            calendar.render();
        } else {
            cardBody.style.display = 'none';
            calendar.destroy();
        }
    });
});
