---
title: dashboard
stats:
    current: 
        variable: ${ variables.current_outage_count = getArrayLength(outages_today, 'status', true), variables.current_outage_count }
        icon: svg/clock.svg
        class: light-orange-bg
        # onclick:
        #     function: changeArrayVariable
        #     params:
        #         - ("outages_today").toString()
        #         - getNestedObjectValuesOfKey(outages_today, 'status', true)
    planned: 
        variable: ${ variables.unplanned_outage_count = getNestedCountByID(outages_today, 'outage_type', 'Planned'), variables.unplanned_outage_count }
        icon: svg/planned.svg
        class: light-green-bg
        # onclick:
        #     function: getTodayOutages
        #     params: 
        #         - "'&outage_type=Planned'"
    unplanned: 
        variable: ${ variables.current_outage_count - variables.unplanned_outage_count }
        icon: svg/unplanned.svg
        class: light-pink-bg
        # onclick:
        #     function: getTodayOutages
        #     params: 
        #         - "'&outage_type=Unplanned'"

tables:
    Outages in the past day:
        template: cards/current_table.html
        variable: outages_today
        item_limit: 5
        key_renaming: true
        keys:
            - id: outage_id
            - street: street
            - suburb: suburb
            - status:
                compare_array: current_outages
                id_array: current_outage_ids
                if_true: active
                if_false: inactive
                values:
                    true: light-orange-bg
                    false: light-gray-bg
            - type:
                mapping: outage_type
                values:
                    planned: light-green-bg
                    unplanned: light-pink-bg
            - start_date: start_date
            # - start_time: start_date
            - end_date: end_date
            # - end_time: end_date
            # - estimated_work:
            #     calculate: findTimeDifference
            #     params:
            #         - end_date
            #         - start_date
            #     max: end_date
            #     min: start_date
            - estimated_work:
                calculate: roundHours
                params:
                    - tablevalue['total_hours']
                    - 2
        enable_search:
            placeholder: Search by ID, street or suburb...
            function: getTodayOutages

---
Hello world