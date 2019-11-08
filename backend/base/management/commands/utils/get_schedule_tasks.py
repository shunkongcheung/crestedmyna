def get_schedule_tasks():
    '''
    name: string (format: {app_name}-{description} )
    task: string
    crontab: crontab 

    order by name
    '''
    return [
        {
            'name': 'stk_alert-periodic_send_alert_emails',
            'task': 'stock.stk_alert.tasks.periodic_send_alert_emails.periodic_send_alert_emails',
            'crontab': '1 3 * * 1-5',
        },
        {
            'name': 'stk_ccass-periodic_create_shareholding_disclosure_records',
            'task': 'stock.stk_ccass.tasks.periodic_create_shareholding_disclosure_records.periodic_create_shareholding_disclosure_records',
            'crontab': '1 1 * * *',
        },
        {
            'name': 'stk_master-periodic_update_or_create_admin_stock_master',
            'task': 'stock.stk_master.tasks.periodic_update_or_create_admin_stock_masters.periodic_update_or_create_admin_stock_masters',
            'crontab': '* 9-17 * * 1-5',
        },
        {
            'name': 'stk_master-update_stock_price',
            'task': 'stock.stk_master.tasks.update_stock_masters_market_price_and_value.update_stock_masters_market_price_and_value',
            'crontab': '* 9-17 * * 1-5',
        },
        {
            'name': 'stk_trend-periodic_create_or_update_ccass_and_price_summary_details',
            'task': 'stock.stk_trend.tasks.periodic_create_or_update_ccass_and_price_summary_details.periodic_create_or_update_ccass_and_price_summary_details',
            'crontab': '1 6 * * *',
        },
    ]
