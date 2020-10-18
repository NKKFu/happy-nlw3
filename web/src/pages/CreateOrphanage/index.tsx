import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../../images/map-marker.svg';

import { Container } from './styles';
import { SideBar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

export function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_hours] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [images, setImages] = useState<File[]>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images?.forEach(image => {
      data.append('images', image);
    });

    console.log(images);

    api.post('orphanages', data).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/app')
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files)
      return;

    const selectedImages = Array.from(event.target.files);

    setImages(images?.concat(selectedImages) || selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(previewImages.concat([...selectedImagesPreview]));
  }

  return (
    <Container>
      <div id="page-create-orphanage">

        <SideBar />

        <main>
          <form onSubmit={handleSubmit} className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={[-27.2092052, -49.6401092]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                />
                {position.latitude !== 0 &&
                  <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
                }
              </Map>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input id="name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {/* TODO: Excluir imagem */}
                  {previewImages.map(image => {
                    return <img key={image} src={image} alt={name} />
                  })}

                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>

                <input multiple onChange={handleSelectImages} type="file" name="" id="image[]" />
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Horário de Funcionamento</label>
                <input id="opening_hours" value={opening_hours} onChange={e => setOpening_hours(e.target.value)} />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={open_on_weekends ? 'active' : ''}
                    onClick={() => setOpen_on_weekends(true)}>
                    Sim
                  </button>
                  <button
                    type="button"
                    className={open_on_weekends ? '' : 'active'}
                    onClick={() => setOpen_on_weekends(false)}>
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
          </button>
          </form>
        </main>
      </div>
    </Container>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
