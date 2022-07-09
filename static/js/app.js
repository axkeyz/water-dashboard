var app = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
        current_outages: [],
        current_outages_page: 1,
        message: 'Planned map section',
        outages_today: [],
        outages_today_page: 1,
        today_date: new Date(),
        current_outage_ids: [],
        all_outages: [],
        all_outages_page: 1,
        all_outages_limit: 50,
        variables: {
            all_outages:
                { 
                    page: 1,
                    total_pages: 0,
                    limit: 50,
                    offset: 0,
                    search: '',
                    count: 0,
                    sort: 'end_date',
                    sort_dir: 'desc',
                },
            modal_outage:
                {
                    outage_type: '',
                    status: false,
                    map: [-36.848461, 174.763336],
                },
        },
    },
    created:function() {
        this.getTodayOutages()
        this.getAllOutages()

        setInterval(() => {
            this.getTodayOutages()
            this.getAllOutages()
        }, 3600000)

        setInterval(() => {
            this.getTodayDate();
        }, 1000)
    },
    mounted:function() {
        window.gmapsCallback = () => this.initMap() // NEW!
        this.gmapsInit() // NEW!
    },
    methods:{
        gmapsInit: function() {
            const apiKey = 'AIzaSyCqjALg8mpGMP5J7KCB_aPQoAVIciqjGok';
            const callbackName = 'gmapsCallback';
      
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
            document.querySelector('head').appendChild(script);
        },
        // initMap sets a Google Map in the #map div and places a marker at the given latitude
        // and longtitude
        initMap:function(
            latitude = this.variables.modal_outage.map[0], 
            longitude = this.variables.modal_outage.map[1], 
            elementID = "map"
        ) {
            // Set array of 
            var myLatlng = new google.maps.LatLng(latitude,longitude);
            var mapOptions = {
                zoom: 14,
                center: myLatlng
            }
            map = new google.maps.Map(document.getElementById(elementID), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
            });

            // To add the marker to the map, call setMap();
            marker.setMap(map);
        },
        ReinitaliseMapFromLocationString:function(locationString = "") {
            if (locationString != "") {
                // Split point location string
                var location = locationString.substring(6, locationString.length - 1).split(" ");

                // Save in the order latitude, longitude
                this.variables.modal_outage.map = [location[1], location[0]]

                // Reinitialise map
                this.initMap()
            }
        },
        getArrayLength:function(data) {
            return data.length;
        },
        getNestedCountByID:function(data, key, val) {
            sum = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i][key] == val) {
                    sum++
                }
            }
            return sum;
        },
        getTodayDate:function() {
            this.today_date = new Date()
        },
        getTodayOutages:function(modifier = '') {
            fetch('http://localhost:1899/count?get=total_hours&get=id&get=street&get=suburb&get=outage_type&get=end_date&get=start_date&get=outage_id&after_end_date=' + new Date().toJSON().slice(0,10) + modifier)
            .then(res => res.json())
            .then(res => {
                if (res == null) {
                    this.outages_today = [];
                } else {
                    this.outages_today = res;
                }
            });
        },
        getAllOutages:function(modifier = '') {
            limit = '&limit='+this.variables.all_outages.limit
            offset = '&offset='+this.variables.all_outages.offset
            sort = '&sort='+this.variables.all_outages.sort+"%20"+this.variables.all_outages.sort_dir
            fetch('http://localhost:1899/?' + limit + offset + sort + modifier )
            .then(res => res.json())
            .then(res => {
                if (res == null) {
                    this.all_outages = [];
                } else {
                    this.all_outages = res;
                    this.getAllOutagesCount(modifier)
                }
            });
        },
        resetPageAndOffsets:function(variable) {
            this['variables'][variable]["page"] = 1;
            this['variables'][variable]["offset"] = 0;
        },
        getAllOutagesCount:function(modifier = '') {
            fetch('http://localhost:1899/count?' + modifier )
            .then(res => res.json())
            .then(res => {
                this.variables.all_outages.count = res[0].total_outages
            });
        },
        // changePageCount:function(variable, change) {
        //     this[variable] += change;
        // },
        changePageCount:function(variable, change) {
            this.variables[variable]['page'] += change;
            this.variables[variable]['offset'] += 2 * change * this.variables[variable]['limit'];
        },
        shortenJSONDate:function(date) {
            var date_form = new Date(date);
            return String(date_form.getDate()).padStart(2, '0') + "/" +  String(date_form.getMonth()+1).padStart(2, '0') + "/" + date_form.getFullYear();
        },
        findJSONDateTime:function(date) {
            var date_form = new Date(date);
            var hours = date_form.getHours();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return String(hours).padStart(2, '0') + ":" + String(date_form.getMinutes()).padStart(2, '0') + ' ' + ampm;
        },
        createLongJSONDate:function(date) {
            var date_form = new Date(date);
            return date_form.toLocaleDateString("en-US", { 
                weekday: 'long', year: 'numeric', month: 'long', 
                day: 'numeric', hour: 'numeric', 
                minute: 'numeric', second: 'numeric' 
            })
        },
        getNestedObjectValuesByKey:function(theObject, nestedKey) {
            var result = [];
            for(var i = 0; i < theObject.length; i++) {
                if (theObject[i][nestedKey] !== undefined) {
                    result.push(theObject[i][nestedKey]);
                }   
            }
            return result;
        },
        // findTimeDifference:function(minDate, maxDate) {
        //     console.log(minDate, maxDate)
        //     date1 = new Date(minDate);
        //     date2 = new Date(maxDate);
        //     return Math.round(Math.abs(date2 - date1) / 36e5);
        // },
        roundHours(decimal, decimalPlaces) {
            return decimal.toFixed(decimalPlaces) + ' h'
        },
        appendArray(arrayName, key, value) {
            return this.$set(arrayName, key, value)
        },
        getNestedObjectValuesOfKey:function(theObject, nestedKey, value) {
            var result = [];
            for(var i = 0; i < theObject.length; i++) {
                if (theObject[i][nestedKey] == value) {
                    result.push(theObject[i]);
                }
            }
            return result;
        },
        changeArrayVariable(arrayName, arrayValues) {
            this[arrayName] = arrayValues;
        },
        toggleModal(modalID){
            modal = this.$refs[modalID]
            if (modal.style.display == 'none' || modal.style.display == "") {
                modal.style.display = 'table'
            } else {
                modal.style.display = 'none'
            }
        },
        updateCurrentOutages(modifier = '') {
            this.getAllOutages(modifier)
        }
    },
})