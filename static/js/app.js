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
        variables: [],
    },
    created:function() {
        this.getTodayOutages()

        setInterval(() => {
            this.getTodayOutages()
        }, 3600000)

        setInterval(() => {
            this.getTodayDate();
        }, 1000)
    },
    methods:{
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
        changePageCount:function(variable, change) {
            this[variable] += change;
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
    },
})