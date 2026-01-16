import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
    return [{ title: 'My Devices | Account' }];
};

export default function AccountDevices() {
    const account = useOutletContext();
    const [devices, setDevices] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newDevice, setNewDevice] = useState({ brand: '', model: '', serial: '', nickname: '' });

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`devices_${account?.customer?.id}`);
        if (saved) {
            setDevices(JSON.parse(saved));
        }
    }, [account]);

    const saveDevices = (newList) => {
        setDevices(newList);
        localStorage.setItem(`devices_${account?.customer?.id}`, JSON.stringify(newList));
    };

    const handleAddDevice = (e) => {
        e.preventDefault();
        const newList = [...devices, { ...newDevice, id: Date.now() }];
        saveDevices(newList);
        setNewDevice({ brand: '', model: '', serial: '', nickname: '' });
        setShowAddForm(false);
    };

    const deleteDevice = (id) => {
        const newList = devices.filter(d => d.id !== id);
        saveDevices(newList);
    };

    return (
        <div className="account-devices-section">
            <div className="section-header">
                <h2>My Devices</h2>
                <button
                    className="button-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : '+ Add New Device'}
                </button>
            </div>

            <p className="section-description">
                Manage your devices here for a more personalized experience and faster repair quotes.
            </p>

            {showAddForm && (
                <form className="add-device-form card animate-in" onSubmit={handleAddDevice}>
                    <h3>Add New Device</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="device-brand">Manufacturer / Brand</label>
                            <input
                                id="device-brand"
                                required
                                placeholder="e.g. Apple, Samsung"
                                className="input-field"
                                value={newDevice.brand}
                                onChange={e => setNewDevice({ ...newDevice, brand: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="device-model">Model Name</label>
                            <input
                                id="device-model"
                                required
                                placeholder="e.g. iPhone 15 Pro"
                                className="input-field"
                                value={newDevice.model}
                                onChange={e => setNewDevice({ ...newDevice, model: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="device-serial">Serial Number / IMEI (Optional)</label>
                            <input
                                id="device-serial"
                                placeholder="Helps with warranty & repair"
                                className="input-field"
                                value={newDevice.serial}
                                onChange={e => setNewDevice({ ...newDevice, serial: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="device-nickname">Nickname</label>
                            <input
                                id="device-nickname"
                                placeholder="e.g. My Main Phone"
                                className="input-field"
                                value={newDevice.nickname}
                                onChange={e => setNewDevice({ ...newDevice, nickname: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="button-primary">Save Device</button>
                </form>
            )}

            <div className="devices-list">
                {devices.length > 0 ? (
                    <div className="devices-grid">
                        {devices.map(device => (
                            <div key={device.id} className="device-card card">
                                <div className="device-icon">
                                    {device.brand.toLowerCase().includes('apple') ? '🍎' : '📱'}
                                </div>
                                <div className="device-info">
                                    <h4>{device.nickname || device.model}</h4>
                                    <p>{device.brand} - {device.model}</p>
                                    {device.serial && <p className="serial">SN: {device.serial}</p>}
                                </div>
                                <div className="device-actions">
                                    <button className="text-link delete" onClick={() => deleteDevice(device.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-devices card">
                        <p>You haven&apos;t added any devices yet.</p>
                    </div>
                )}
            </div>

            {/* Styles local to this page in account.css mostly, but some here for specific layout */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .account-devices-section {
          padding: 20px 0;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .section-description {
          opacity: 0.7;
          margin-bottom: 30px;
        }
        .devices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .device-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          position: relative;
        }
        .device-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .device-info h4 {
          margin: 0 0 4px;
        }
        .device-info p {
          margin: 0;
          font-size: 14px;
          opacity: 0.8;
        }
        .device-info p.serial {
          font-size: 12px;
          font-family: monospace;
          margin-top: 4px;
        }
        .device-actions {
          position: absolute;
          top: 15px;
          right: 15px;
        }
        .add-device-form {
          margin-bottom: 40px;
          border-left: 4px solid var(--color-primary);
        }
        .text-link.delete {
          color: #ff4d4f;
          font-size: 12px;
          cursor: pointer;
          background: none;
          border: none;
        }
      `}} />
        </div>
    );
}

/** @typedef {import('./+types/account.devices').Route} Route */
