import { CUSTOMER_UPDATE_MUTATION } from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from 'react-router';
import { useState } from 'react';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Profile' }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  context.customerAccount.handleAuthStatus();

  return {};
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const { customerAccount } = context;

  if (request.method !== 'PUT') {
    return data({ error: 'Method not allowed' }, { status: 405 });
  }

  const form = await request.formData();

  try {
    const customer = {};
    const validInputKeys = ['firstName', 'lastName', 'phone'];
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key] = value;
      }
    }

    // Handle profile image upload
    const profileImage = form.get('profileImage');
    if (profileImage && profileImage instanceof File && profileImage.size > 0) {
      // In a real app, you'd upload to your storage service (Cloudinary, S3, etc.)
      // For now, we'll store it as a base64 string in customer metafields
      const reader = new FileReader();
      const imageData = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(profileImage);
      });

      // Note: You'd need to add metafield mutation here
      // For now, we'll just acknowledge the upload
      customer.profileImageUrl = imageData;
    }

    // update customer
    const { data: responseData, errors } = await customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer,
          language: customerAccount.i18n.language,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (!responseData?.customerUpdate?.customer) {
      throw new Error('Customer profile update failed.');
    }

    return {
      error: null,
      customer: responseData?.customerUpdate?.customer,
      success: 'Profile updated successfully!',
    };
  } catch (error) {
    return data(
      { error: error.message, customer: null },
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext();
  const { state } = useNavigation();
  /** @type {ActionReturnData} */
  const action = useActionData();
  const customer = action?.customer ?? account?.customer;
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-profile">
      <h2>My Profile</h2>
      <br />

      {action?.success && (
        <div className="success-message">
          <p>✓ {action.success}</p>
        </div>
      )}

      <Form method="PUT" encType="multipart/form-data">
        {/* Profile Image Section */}
        <fieldset className="profile-image-section">
          <legend>Profile Photo</legend>
          <div className="profile-image-upload">
            <div className="image-preview">
              {imagePreview || customer.profileImageUrl ? (
                <img
                  src={imagePreview || customer.profileImageUrl}
                  alt="Profile"
                  className="profile-avatar"
                />
              ) : (
                <div className="avatar-placeholder">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
                    <path d="M40 40C46.6274 40 52 34.6274 52 28C52 21.3726 46.6274 16 40 16C33.3726 16 28 21.3726 28 28C28 34.6274 33.3726 40 40 40Z" fill="#9CA3AF" />
                    <path d="M64 64C64 52.9543 55.0457 44 44 44H36C24.9543 44 16 52.9543 16 64V68H64V64Z" fill="#9CA3AF" />
                  </svg>
                </div>
              )}
            </div>
            <div className="upload-controls">
              <label htmlFor="profileImage" className="button-secondary">
                Choose Photo
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input-hidden"
              />
              <p className="upload-hint">JPG, PNG or GIF. Max 5MB.</p>
            </div>
          </div>
        </fieldset>

        <br />

        {/* Personal Information */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="First name"
                aria-label="First name"
                defaultValue={customer.firstName ?? ''}
                minLength={2}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Last name"
                aria-label="Last name"
                defaultValue={customer.lastName ?? ''}
                minLength={2}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 123-4567"
              aria-label="Phone number"
              defaultValue={customer.phone ?? ''}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              aria-label="Email"
              value={customer.emailAddress?.emailAddress ?? ''}
              disabled
              className="input-field input-disabled"
            />
            <p className="field-hint">Email cannot be changed here. Contact support to update.</p>
          </div>
        </fieldset>

        {action?.error ? (
          <p className="error-message">
            <mark>
              <small>{action.error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}

        <button type="submit" disabled={state !== 'idle'} className="button-primary">
          {state !== 'idle' ? 'Updating...' : 'Save Changes'}
        </button>
      </Form>

      <br />
      <hr />
      <br />

      {/* Payment Methods Section */}
      <div className="payment-methods-section">
        <h3>Payment Methods</h3>
        <p className="section-description">
          Securely manage your payment methods. Your card information is encrypted and stored by Shopify.
        </p>
        <br />

        <div className="payment-methods-list">
          {/* Placeholder - Shopify handles payment methods through checkout */}
          <div className="payment-method-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="32" rx="4" fill="#E5E7EB" />
              <rect x="4" y="8" width="16" height="4" rx="2" fill="#9CA3AF" />
              <rect x="4" y="20" width="24" height="4" rx="2" fill="#9CA3AF" />
            </svg>
            <div>
              <p><strong>Add Payment Method</strong></p>
              <p className="text-small">Payment methods will be added during checkout for security</p>
            </div>
          </div>
        </div>

        <p className="payment-notice">
          <strong>Note:</strong> For security, payment methods are managed through Shopify&apos;s secure checkout process.
          Your card will be saved automatically when you complete your first purchase.
        </p>
      </div>
    </div>
  );
}

/**
 * @typedef {{
 *   error: string | null;
 *   customer: CustomerFragment | null;
 *   success?: string;
 * }} ActionResponse
 */

/** @typedef {import('customer-accountapi.generated').CustomerFragment} CustomerFragment */
/** @typedef {import('@shopify/hydrogen/customer-account-api-types').CustomerUpdateInput} CustomerUpdateInput */
/** @typedef {import('./+types/account.profile').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
