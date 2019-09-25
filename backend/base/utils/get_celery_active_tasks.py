from celery.task.control import inspect


def get_celery_active_tasks(task_name=None):
    i = inspect()
    active_data = i.active()
    if not active_data:
        print('am i her>e')
        return []

    active_data_first_key = list(active_data.keys())[0]
    tasks = active_data[active_data_first_key]
    return list(filter(lambda x: x['name'] == task_name, tasks)) if task_name else tasks
