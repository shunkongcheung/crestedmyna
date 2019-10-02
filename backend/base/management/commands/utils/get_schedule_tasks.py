def get_schedule_tasks():
    '''
    name: string (format: {app_name}-{description} )
    task: string
    crontab: crontab 

    order by name
    '''
    return [
        {
            'name': 'stk_ccass-periodic_create_shareholding_disclosure_records',
            'task': 'stock.stk_master.tasks.periodic_create_shareholding_disclosure_records.periodic_create_shareholding_disclosure_records',
            'crontab': '1 1 * * *',
        },
        {
            'name': 'stk_master-update_stock_price',
            'task': 'stock.stk_master.tasks.update_stock_masters_market_price_and_value.update_stock_masters_market_price_and_value',
            'crontab': '1 0 * * *',
        },
    ]
