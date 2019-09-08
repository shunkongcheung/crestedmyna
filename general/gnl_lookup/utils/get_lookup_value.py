from general.models import LookUp


def get_lookup(name, catagory=None, is_public=None):
    kwargs = {'name': name}

    if not catagory is None:
        kwargs['catagory'] = catagory

    if not is_public is None:
        kwargs['is_public'] = is_public

    return LookUp.objects.get(**kwargs)


def get_lookup_value(name, catagory=None, is_public=None):
    lookup = get_lookup(name, catagory, is_public)
    return lookup.lookup_value
