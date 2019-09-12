from general.models import MediaMaster


def update_medias(instance, media_values):
    media_ids = list(map(lambda x: x['id'], media_values))

    # archive removed medias
    archive_medias = instance.medias\
        .exclude(id__in=media_ids)
    archive_medias.update(enable=False)

    # claer all relations
    instance.medias.clear()

    # add back new relations
    medias = MediaMaster.objects.filter(id__in=media_ids,
                                        enable=True,
                                        created_by=instance.created_by
                                        )
    for media in medias:
        instance.medias.add(media)
