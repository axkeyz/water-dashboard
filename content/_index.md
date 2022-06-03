---
title: dashboard
stats:
    current: 
        variable: ${ getArrayLength(current_outages) }
        icon: svg/clock.svg
        class: light-orange-bg
    planned: 
        variable: ${ getNestedCountByID(current_outages, 'outageType', 'Planned') }
        icon: svg/planned.svg
        class: light-green-bg
    unplanned: 
        variable: ${ getNestedCountByID(current_outages, 'outageType', 'Unplanned') }
        icon: svg/unplanned.svg
        class: light-pink-bg

tables:
    Outages Today:
        variable: outages_today
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
            - type:
                mapping: outage_type
                values:
                    planned: light-green-bg
                    unplanned: light-pink-bg
            - start_date: start_date
            # - start_time: start_date
            - end_date: end_date
            # - end_time: end_date
            - estimated_work:
                calculate: findTimeDifference
                params:
                    - end_date
                    - start_date
                max: end_date
                min: start_date

---
Hello world